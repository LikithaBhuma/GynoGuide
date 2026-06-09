// src/utils/anthropicApi.js
const GYNECOLOGY_SYSTEM_PROMPT = `You are GynoGuideAI, a specialized AI assistant focused exclusively on gynecology and women's reproductive health. You are knowledgeable, compassionate, and evidence-based.

Your expertise covers:
- Gynecological conditions: endometriosis, PCOS, fibroids, ovarian cysts, cervical/ovarian/uterine cancer, vaginitis, PID, vulvodynia
- Menstrual health: irregular periods, dysmenorrhea, amenorrhea, menorrhagia
- Hormonal health: menopause, perimenopause, HRT, hormonal contraception
- Fertility and reproductive health: ovulation, IVF, fertility medications
- Preventive care: Pap smears, HPV vaccine, breast/pelvic exams, screening guidelines
- Medications used in gynecology and their indications
- Anatomy and physiology of the female reproductive system

Communication guidelines:
- Use clear, non-technical language when possible
- Be empathetic and sensitive
- Always recommend consulting a qualified gynecologist
- Never provide specific diagnoses
- For urgent symptoms advise immediate medical attention
- Base responses on ACOG, WHO, RCOG guidelines
- Format responses using markdown

Always remind users responses are educational only, not a substitute for professional medical advice.`

export async function sendMessage(messages) {
  const apiKey = (import.meta.env.VITE_OPENROUTER_API_KEY || '').trim()

  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    throw new Error('API_KEY_MISSING')
  }

  let response
  try {
    response = await fetch('/openrouter/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'GynoGuideAI',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        max_tokens: 1024,
        messages: [
          { role: 'system', content: GYNECOLOGY_SYSTEM_PROMPT },
          ...messages.map(m => ({ role: m.role, content: m.content })),
        ],
      }),
    })
  } catch (networkErr) {
    throw new Error(`Network error: ${networkErr.message}`)
  }

  // Read raw text first — never assume it's valid JSON
  const rawText = await response.text()
  console.log('OpenRouter raw response:', response.status, rawText)

  if (!rawText) {
    throw new Error(`Empty response from server (status ${response.status}). Check Vite proxy in vite.config.js.`)
  }

  let data
  try {
    data = JSON.parse(rawText)
  } catch {
    throw new Error(`Invalid JSON from server: ${rawText.slice(0, 200)}`)
  }

  if (!response.ok) {
    throw new Error(data?.error?.message || `OpenRouter error ${response.status}`)
  }

  return data.choices[0].message.content
}

export const SUGGESTED_QUESTIONS = [
  'What are the early symptoms of endometriosis?',
  'How is PCOS diagnosed and treated?',
  'What is the difference between bacterial vaginosis and a yeast infection?',
  'When should I start getting Pap smears?',
  'What are the signs of perimenopause?',
  'Can PCOS affect my fertility?',
  'What medications are used for heavy periods?',
  'How often should I have a gynecological exam?',
  'What are the risk factors for ovarian cancer?',
  'What is the HPV vaccine and who should get it?',
]