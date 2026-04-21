import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const analyzeContract = async (rawText) => {
  // Trim text to avoid exceeding token limits
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
  "summary": "2-3 sentence plain English summary of what this contract is about and who the parties are",
  "riskScore": 45,
  "clauses": [
    {
      "title": "Payment Terms",
      "text": "exact relevant text from the contract for this clause",
      "risk": "high",
      "explanation": "Plain English explanation of why this is risky or notable",
      "suggestion": "What the user should negotiate or watch out for"
    }
  ],
  "deadlines": [
    {
      "label": "Contract Expiry Date",
      "date": "2025-12-31"
    }
  ]
}

Rules you MUST follow:
- riskScore must be a number between 0 and 100 (higher = more risky)
- risk field must be exactly one of: "low", "medium", "high"
- Extract ALL important clauses: payment, termination, IP ownership, liability, confidentiality, non-compete, penalties, renewal
- Extract ALL dates and deadlines found in the contract
- If no deadlines found, return empty array: "deadlines": []
- Keep all explanations in simple plain English, no legal jargon
- Return ONLY the JSON object, nothing else before or after it
`;

  const response = await groq.chat.completions.create({
    model:       'llama-3.3-70b-versatile',
    temperature: 0.1, // low temperature = consistent, precise output
    max_tokens:  4000,
    messages: [
      {
        role:    'user',
        content: prompt,
      },
    ],
  });

  const content = response.choices[0].message.content.trim();

  // ─── Clean and Parse JSON ────────────────────────
  // Sometimes AI wraps response in ```json ... ``` — strip it
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

  // ─── Validate Required Fields ────────────────────
  if (
    typeof parsed.summary    !== 'string' ||
    typeof parsed.riskScore  !== 'number' ||
    !Array.isArray(parsed.clauses) ||
    !Array.isArray(parsed.deadlines)
  ) {
    throw new Error('AI response is missing required fields');
  }

  return parsed;
};