require('dotenv').config()
const express = require('express')
const axios = require('axios')
const Anthropic = require('@anthropic-ai/sdk')
const products = require('./products')

const app = express()
app.use(express.json())

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// build product list text for Claude to read
const productList = products.map(p =>
  `- ${p.name} (${p.category}): ${p.price} — ${p.description}`
).join('\n')

const SYSTEM_PROMPT = `
You are a knowledgeable and friendly sales assistant for a CCTV and security camera shop in Sri Lanka.
Reply in the same language the customer uses — Sinhala or English.
Keep replies short and clear — this is WhatsApp not email.

BRANDS WE SELL:
- IMOU (WiFi cameras, 4G cameras, solar cameras, NVRs, smart home)
- EZVIZ (WiFi cameras, 4G cameras, POE cameras, battery cameras, video door phones, smart locks)
- Hikvision (available on request)

HOW TO RECOMMEND BY CUSTOMER NEED:
- No WiFi location → recommend 4G cameras (IMOU or EZVIZ 4G range)
- No power cable → recommend solar/battery cameras (IMOU Cell 3C, AOV Solar, EZVIZ EB3, HB8)
- Indoor home camera → recommend IMOU Ranger Mini, EZVIZ H1C or H6c Pro
- Outdoor camera → recommend IMOU Cruiser SC or EZVIZ H3c/H8C PRO
- Best quality outdoor → recommend IMOU Cruiser Triple or EZVIZ H90
- Budget camera → IMOU Ranger 2 (Rs. 5,400) or EZVIZ TY1 Pro (Rs. 6,175)
- Door security → EZVIZ video door phones or smart locks
- Full home security → recommend complete package with NVR

ALL PRODUCTS AND PRICES (DPP):
${productList}

SERVICES:
- Installation available in and around Colombo
- Free site visit for large orders
- 2 year warranty on Hikvision products
- 3 year warranty on IMOU products (from activation date)
- Island wide delivery available
- Remote viewing setup included

HOW TO HELP CUSTOMERS:
- If customer asks "best camera for outdoor" → recommend IMOU Cruiser SC or Hikvision Dual-light
- If customer asks "camera without WiFi" → recommend 4G cameras (IMOU or Hikvision 4G range)
- If customer asks "camera without power cable" → recommend solar/battery cameras (IMOU Cell 3C, AOV Solar)
- If customer asks "cheap camera" → recommend IMOU Ranger 2 (Rs. 5,400) or Hikvision IR cameras
- If customer asks "best qualffity" → recommend IMOU Titan Pro or Hikvision ColorVu 3.0
- If customer wants a full package → ask how many cameras, indoor or outdoor, with DVR/NVR or cloud storage
- If customer wants to place an order → ask for name, address, and phone number
- When a customer asks to see a product image or photo, say "Sure! Here is the image of [product name]" — the image will be sent automatically
- You CAN share product images — never say you cannot share images
- If asked for a photo or image, confirm you are sending it
- If customers are asking for wifi or 4G cameras, always ask if they need SD cards, power supply,TT cables

RULES:
- Only use prices from the product list above
- Never make up prices or products
- If asked about installation cost, say "depends on location and number of cameras, we will visit and quote"
- If you don't know something say "Let me check with our team and get back to you"
- Always mention warranty when recommending a product
`

// store chat history per customer
const chatHistory = {}

// find matching product for image sending
function findProduct(message) {
  const msg = message.toLowerCase()
  return products.find(p => {
    const name = p.name.toLowerCase()
    // check if any significant part of product name is in the message
    const words = name.split(' ').filter(w => w.length > 3)
    const matchCount = words.filter(w => msg.includes(w)).length
    return matchCount >= 2
  })
}

// send text message to WhatsApp
async function sendText(to, text) {
  await axios.post(
    `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

// send product image with caption to WhatsApp
async function sendImage(to, imageUrl, caption) {
  await axios.post(
    `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: 'whatsapp',
      to,
      type: 'image',
      image: {
        link: imageUrl,
        caption: caption
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

// receive messages from WhatsApp
app.post('/webhook', async (req, res) => {
  try {
    const body = req.body
    if (body.object !== 'whatsapp_business_account') return res.sendStatus(404)

    const value = body.entry?.[0]?.changes?.[0]?.value
    const message = value?.messages?.[0]

// ignore messages sent BY the bot (outgoing messages)
if (!message || message.type !== 'text') return res.sendStatus(200)

// ignore if message is from your own bot number
const botNumber = process.env.PHONE_NUMBER_ID
const contacts = value?.contacts?.[0]
if (!contacts) return res.sendStatus(200)

// only process incoming messages not status updates
if (body.entry?.[0]?.changes?.[0]?.value?.statuses) return res.sendStatus(200)

    const customerPhone = message.from
    const customerMessage = message.text.body
    console.log(`From ${customerPhone}: ${customerMessage}`)

    // set up chat history
    if (!chatHistory[customerPhone]) chatHistory[customerPhone] = []
    chatHistory[customerPhone].push({ role: 'user', content: customerMessage })
    if (chatHistory[customerPhone].length > 10) {
      chatHistory[customerPhone] = chatHistory[customerPhone].slice(-10)
    }

    // get Claude's reply
    const response = await claude.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: chatHistory[customerPhone]
    })

    const botReply = response.content[0].text
    chatHistory[customerPhone].push({ role: 'assistant', content: botReply })

    // check if customer asked about a specific product
const matchedProduct = findProduct(customerMessage)
console.log('Matched product:', matchedProduct ? matchedProduct.name : 'none')
console.log('Image URL:', matchedProduct ? matchedProduct.image : 'none')

// send image only if valid URL exists
if (matchedProduct && 
    matchedProduct.image && 
    matchedProduct.image.startsWith('https://')) {
  await sendImage(
    customerPhone,
    matchedProduct.image,
    `${matchedProduct.name} — ${matchedProduct.price}`
  )
}

    // always send the text reply
    // always send the text reply
await sendText(customerPhone, botReply)
console.log(`Reply sent: ${botReply}`)

// check if message contains order intent
const hasOrder = customerMessage.toLowerCase().includes('order') ||
  customerMessage.toLowerCase().includes('buy') ||
  customerMessage.toLowerCase().includes('want') ||
  customerMessage.toLowerCase().includes('delivery') ||
  customerMessage.toLowerCase().includes('address') ||
  customerMessage.toLowerCase().includes('ගන්න') ||
  customerMessage.toLowerCase().includes('ඕන')

// save to Supabase
const { data, error } = await supabase
  .from('conversations')
  .insert({
    customer_phone: customerPhone,
    customer_message: customerMessage,
    bot_reply: botReply,
    has_order: hasOrder
  })

if (error) {
  console.error('Supabase error:', error)
} else {
  console.log('Saved to Supabase:', data)
}

res.sendStatus(200)

  } catch (error) {
  console.error('FULL ERROR:')

  if (error.response) {
    console.error('Status:', error.response.status)
    console.error('Data:', error.response.data)
  } else {
    console.error(error)
  }

  res.sendStatus(500)
}
})

// verify webhook with Meta.
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('Webhook verified')
    res.status(200).send(challenge)
  } else {
    res.sendStatus(403)
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'CCTV Bot running' })
})


// test route — remove this before going live
app.post('/test', async (req, res) => {
  const { message } = req.body

  if (!chatHistory['test']) chatHistory['test'] = []
  chatHistory['test'].push({ role: 'user', content: message })

  const response = await claude.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: chatHistory['test']
  })

  const botReply = response.content[0].text
  chatHistory['test'].push({ role: 'assistant', content: botReply })

  res.json({ reply: botReply })
})


app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port ' + (process.env.PORT || 3000))
})