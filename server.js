require('dotenv').config()
const express = require('express')
const axios = require('axios')
const Anthropic = require('@anthropic-ai/sdk')
const products = require('./products')

const app = express()
app.use(express.json())

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

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
- 2 year warranty on EZVIZ products
- 2 year warranty on IMOU products (from activation date)
- Island wide delivery available
- Remote viewing setup included

RULES:
- Only use prices from the product list above
- Never make up prices or products
- If asked about installation cost, say "depends on location and number of cameras, we will visit and quote"
- If you don't know something say "Let me check with our team and get back to you"
- Always mention warranty when recommending a product
- If customers ask for WiFi or 4G cameras, always ask if they need SD cards, power supply, TT cables
- If customers ask for Hikvision analog cameras, tell them they also need BNC Jacks, power supply, TT cables, 3c2v cables, hard disk
- You CAN share product images — never say you cannot share images
- When a customer asks to see a product image or photo, say "Sure! Here is the image of [product name]" — the image will be sent automatically
- NEVER say "the image will appear shortly" — just say "Here is the image of [product name]"

ORDER PROCESS — FOLLOW THIS EXACTLY:
When customer says they want to order:
1. Ask them to list all items they want with quantities
2. Ask for their full name
3. Ask for their delivery address
4. Ask for their contact phone number
5. Once you have all 4 details, show a summary like this:

📋 Order Summary:
Items: [items]
Name: [name]
Address: [address]
Phone: [phone]

Type ORDER CONFIRMED to place your order or CANCEL to cancel.

6. Wait for customer to type ORDER CONFIRMED
7. Only when they type ORDER CONFIRMED — reply with EXACTLY this and nothing else, no extra text:

ORDER_CONFIRMED
NAME: [name]
PHONE: [phone]
ADDRESS: [address]
ITEMS: [items]

NEVER include ORDER_CONFIRMED in your reply unless the customer explicitly typed ORDER CONFIRMED.
If customer types CANCEL, say Order cancelled. Let me know if you need anything else.
`

const chatHistory = {}

function findProduct(message) {
  const msg = message.toLowerCase()
  
  let best = null
  let bestScore = 0
  
  products.forEach(p => {
    const name = p.name.toLowerCase()
    let score = 0
    
    // check if product name words appear in message
    const nameWords = name.split(' ').filter(w => w.length > 1)
    const nameMatches = nameWords.filter(w => msg.includes(w)).length
    score += nameMatches * 2
    
    // check if message words appear in product name
    const msgWords = msg.split(' ').filter(w => w.length > 1)
    const msgMatches = msgWords.filter(w => name.includes(w)).length
    score += msgMatches
    
    // bonus if brand name matches
    if (msg.includes('imou') && name.includes('imou')) score += 3
    if (msg.includes('ezviz') && name.includes('ezviz')) score += 3
    if (msg.includes('hikvision') && name.includes('hikvision')) score += 3
    
    if (score > bestScore && score >= 2) {
      bestScore = score
      best = p
    }
  })
  
  console.log('Best match:', best ? best.name : 'NONE', 'Score:', bestScore)
  return best
}

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

async function sendImage(to, imageUrl, caption) {
  await axios.post(
    `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: 'whatsapp',
      to,
      type: 'image',
      image: { link: imageUrl, caption: caption }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

app.post('/webhook', async (req, res) => {
  res.sendStatus(200)

  try {
    const body = req.body
    if (body.object !== 'whatsapp_business_account') return

    const value = body.entry?.[0]?.changes?.[0]?.value

    if (value?.statuses) return

    const message = value?.messages?.[0]
    if (!message || message.type !== 'text') return

    const msgTimestamp = parseInt(message.timestamp)
    const now = Math.floor(Date.now() / 1000)
    if ((now - msgTimestamp) > 30) {
      console.log('Ignoring old message, age:', now - msgTimestamp, 'seconds')
      return
    }

    const customerPhone = message.from
    const customerMessage = message.text.body
    console.log(`From ${customerPhone}: ${customerMessage}`)

    if (!chatHistory[customerPhone]) chatHistory[customerPhone] = []
    chatHistory[customerPhone].push({ role: 'user', content: customerMessage })
    if (chatHistory[customerPhone].length > 10) {
      chatHistory[customerPhone] = chatHistory[customerPhone].slice(-10)
    }

    const response = await claude.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: chatHistory[customerPhone]
    })

    const botReply = response.content[0].text
    chatHistory[customerPhone].push({ role: 'assistant', content: botReply })
    console.log(`Bot reply: ${botReply}`)

    if (botReply.includes('ORDER_CONFIRMED')) {
      // flexible parser
      const extractField = (text, field) => {
        const regex = new RegExp(field + ':?\\s*([^\\n]+)', 'i')
        const match = text.match(regex)
        return match ? match[1].trim() : 'Unknown'
      }

      const name = extractField(botReply, 'NAME')
      const phone = extractField(botReply, 'PHONE')
      const address = extractField(botReply, 'ADDRESS')
      const items = extractField(botReply, 'ITEMS')

      console.log('Order - Name:', name, 'Phone:', phone, 'Address:', address, 'Items:', items)

      const { error: orderError } = await supabase.from('orders').insert({
        customer_phone: customerPhone,
        customer_name: name,
        customer_address: address,
        items: items,
        status: 'pending'
      })

      if (orderError) {
        console.error('Order save error:', orderError.message)
      } else {
        console.log('Order saved to Supabase')
      }

      await sendText(customerPhone,
        `✅ Order Confirmed!\n\n` +
        `Name: ${name}\n` +
        `Address: ${address}\n` +
        `Items: ${items}\n\n` +
        `Our team will contact you shortly to confirm delivery. Thank you! 🙏`
      )

    } else {
      const matchedProduct = findProduct(customerMessage)
      console.log('Customer message:', customerMessage)
      console.log('Matched product:', matchedProduct ? matchedProduct.name : 'NONE')
      console.log('Image URL:', matchedProduct ? matchedProduct.image : 'NONE')
      
      if (matchedProduct && matchedProduct.image && matchedProduct.image.startsWith('https://')) {
        console.log('Sending image...')
        try {
          await sendImage(
            customerPhone,
            matchedProduct.image,
            `${matchedProduct.name} — ${matchedProduct.price}`
          )
          console.log('Image sent successfully')
        } catch (imgError) {
          console.error('Image send error:', imgError.response ? imgError.response.data : imgError.message)
        }
      } else {
        console.log('No image to send — either no match or no image URL')
      }

      await sendText(customerPhone, botReply)
    }

    const { error: convError } = await supabase.from('conversations').insert({
      customer_phone: customerPhone,
      customer_message: customerMessage,
      bot_reply: botReply,
      has_order: botReply.includes('ORDER_CONFIRMED')
    })

    if (convError) {
      console.error('Conversation save error:', convError.message)
    } else {
      console.log('Conversation saved')
    }

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message)
  }
})

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