const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeContract = async (rawText) => {
  const trimmedText = rawText.slice(0, 8000);

  const prompt = `
You are a senior legal analyst AI. Carefully analyze the contract text below.
Respond ONLY with a valid JSON object. No explanation, no markdown, no extra text.

CONTRACT TEXT:
"""
${trimmedText}
"""

Respond with EXACTLY this JSON structure:
{
  "summary": "2-3 sentence plain English summary",
  "riskScore": 45,
  "clauses": [
    {
      "title": "Payment Terms",
      "text": "exact relevant text from the contract",
      "risk": "high",
      "explanation": "Plain English explanation",
      "suggestion": "What to negotiate"
    }
  ],
  "deadlines": [
    {
      "label": "Contract Expiry",
      "date": "2025-12-31"
    }
  ]
}

Rules:
- riskScore must be 0-100
- risk must be exactly: "low", "medium", or "high"
- Extract ALL important clauses
- Extract ALL dates
- Return ONLY the JSON object
`;

  const response = await groq.chat.completions.create({
    model:       'llama-3.3-70b-versatile',
    temperature: 0.1,
    max_tokens:  4000,
    messages:    [{ role: 'user', content: prompt }],
  });

  const content = response.choices[0].message.content.trim();
  const cleaned = content
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`AI returned invalid JSON: ${err.message}`);
  }

  if (
    typeof parsed.summary   !== 'string' ||
    typeof parsed.riskScore !== 'number' ||
    !Array.isArray(parsed.clauses) ||
    !Array.isArray(parsed.deadlines)
  ) {
    throw new Error('AI response is missing required fields');
  }

  return parsed;
};

module.exports = { analyzeContract };