require('dotenv').config()
const express = require('express')
const axios = require('axios')
const Anthropic = require('@anthropic-ai/sdk')
const products = require('./products')

const app = express()
app.use(express.json())

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// build product list text for Claude to read
const productList = products.map(p =>
  `- ${p.name}: ${p.price} — ${p.description}`
).join('\n')

const SYSTEM_PROMPT = `
You are a helpful sales assistant for a CCTV shop in Sri Lanka.
Be friendly, professional, and reply in the same language the customer uses.
If they write in Sinhala, reply in Sinhala. If English, reply in English.

PRODUCTS:
${productList}

SERVICES:
- Installation available in Colombo and suburbs
- Installation: Rs. 5,000 for 4 cameras, Rs. 8,000 for 8 cameras
- Free site visit for orders above Rs. 50,000
- 1 year warranty on all products
- Island wide delivery for Rs. 500
- Open 9am to 6pm, Monday to Saturday

RULES:
- Only use prices from the product list above
- If customer wants to order, ask for name, address and phone number
- If you don't know something say "Let me check and get back to you"
- Keep replies short and clear — this is WhatsApp not email
- When a customer asks about a specific product, mention the price and key features
`

// store chat history per customer
const chatHistory = {}

// find matching product for image sending
function findProduct(message) {
  const msg = message.toLowerCase()
  return products.find(p =>
    p.name.toLowerCase().split(' ').some(word =>
      word.length > 3 && msg.includes(word)
    )
  )
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

    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
    if (!message || message.type !== 'text') return res.sendStatus(200)

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

    // send image first if product found and has image
    if (matchedProduct && matchedProduct.image !== 'YOUR_GOOGLE_DRIVE_LINK_HERE') {
      await sendImage(
        customerPhone,
        matchedProduct.image,
        `${matchedProduct.name} — ${matchedProduct.price}`
      )
    }

    // always send the text reply
    await sendText(customerPhone, botReply)
    console.log(`Reply sent: ${botReply}`)
    res.sendStatus(200)

  } catch (error) {
    console.error('Error:', error.message)
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