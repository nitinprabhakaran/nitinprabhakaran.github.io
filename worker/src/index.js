import { RESUME_CONTEXT } from './resume-context.js'

const SYSTEM_PROMPT = `You are an AI assistant for Nitin Prabhakaran's portfolio website.
Answer questions concisely and professionally, focusing on Nitin's career, skills, experience, and projects.
Base your answers solely on the resume data provided. If asked about something not in the data, say you don't have that information.
Keep responses under 150 words unless asked for detail. Be conversational but professional.

--- RESUME DATA ---
${RESUME_CONTEXT}
--- END RESUME DATA ---`

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL    = 'llama-3.1-8b-instant'

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin':  origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age':       '86400',
  }
}

function isAllowedOrigin(origin, env) {
  if (!origin) return false
  // Allow both production and localhost for development
  return origin === env.ALLOWED_ORIGIN || origin.startsWith('http://localhost')
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) })
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    if (!isAllowedOrigin(origin, env)) {
      return new Response('Forbidden', { status: 403 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return new Response('Invalid JSON', { status: 400 })
    }

    const { message, history = [] } = body
    if (!message || typeof message !== 'string') {
      return new Response('Missing message', { status: 400 })
    }

    const messages = [
      { role: 'system',  content: SYSTEM_PROMPT },
      ...history.slice(-6),           // keep last 3 turns for context
      { role: 'user',    content: message.slice(0, 500) }, // cap input length
    ]

    let groqResponse
    try {
      groqResponse = await fetch(GROQ_URL, {
        method:  'POST',
        headers: {
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          model:       MODEL,
          messages,
          stream:      true,
          max_tokens:  300,
          temperature: 0.65,
        }),
      })
    } catch (err) {
      return new Response('Upstream error', { status: 502 })
    }

    if (!groqResponse.ok) {
      const errText = await groqResponse.text()
      console.error('Groq error:', errText)
      return new Response('LLM error', { status: 502 })
    }

    // Pass the SSE stream straight through to the browser
    return new Response(groqResponse.body, {
      headers: {
        ...corsHeaders(origin),
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  },
}
