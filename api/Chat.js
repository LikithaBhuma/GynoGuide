// api/chat.js
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const apiKey = process.env.VITE_OPENROUTER_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'API key not configured' } })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch(e) {}
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://gyno-guide.vercel.app',
        'X-Title': 'GynoGuideAI',
      },
      body: JSON.stringify(body),
    })

    const text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch(e) {
      return res.status(500).json({ error: { message: `Bad response: ${text.slice(0, 100)}` } })
    }
    return res.status(response.status).json(data)
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } })
  }
}
