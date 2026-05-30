export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return res.status(500).json({ result: 'ERROR: GROQ_API_KEY is not set.' })
  }

  const { cmd } = req.body

  if (!cmd) {
    return res.status(400).json({ result: 'ERROR: No command provided.' })
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: 'You are a Linux expert. Explain Linux commands clearly.'
          },
          {
            role: 'user',
            content: `Explain this Linux command:

${cmd}

Format:
📌 WHAT IT DOES
One sentence summary.

🔍 BREAKDOWN
Explain each part/flag one by one.

⚠️ WATCH OUT
Any gotchas or risks.

💡 PRO TIP
A practical tip or variation.`
          }
        ]
      })
    })

    const data = await response.json()

    if (data.error) {
      return res.status(500).json({ result: `Groq error: ${data.error.message}` })
    }

    const text = data.choices?.[0]?.message?.content || 'No response from Groq.'
    res.status(200).json({ result: text })

  } catch (err) {
    res.status(500).json({ result: `Server error: ${err.message}` })
  }
}