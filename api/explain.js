export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const { cmd } = req.body

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content: 'You are a Linux expert and teacher. Explain Linux commands clearly and concisely.'
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
A practical tip or variation.

Be concise. No jargon.`
        }
      ]
    })
  })

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content || 'No response.'
  res.status(200).json({ result: text })
}
