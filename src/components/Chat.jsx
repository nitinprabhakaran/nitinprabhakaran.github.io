import { useState, useRef, useEffect } from 'react'

const WORKER_URL = import.meta.env.VITE_CHAT_WORKER_URL || ''

const SUGGESTIONS = [
  "What's Nitin's current tech stack?",
  'Tell me about the AI agents work at Envestnet',
  'What certifications does Nitin hold?',
  'Which companies has Nitin worked at?',
]

function parseSSEStream(stream, onToken) {
  const reader  = stream.getReader()
  const decoder = new TextDecoder()
  let buffer    = ''

  const pump = async () => {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() // keep incomplete last line
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6).trim()
        if (data === '[DONE]') return
        try {
          const token = JSON.parse(data).choices?.[0]?.delta?.content || ''
          if (token) onToken(token)
        } catch { /* skip malformed */ }
      }
    }
  }
  return pump()
}

export default function Chat() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [shown,    setShown]    = useState(false) // greeting shown flag
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  // Scroll to bottom on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      if (!shown) {
        setMessages([{
          id: 'greeting',
          role: 'assistant',
          content: "Hi! I'm Nitin's portfolio assistant. Ask me anything about his experience, skills, or projects.",
        }])
        setShown(true)
      }
    }
  }, [open, shown])

  async function sendMessage(text) {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')

    const userMsg = { id: Date.now(), role: 'user', content: msg }
    const aiMsg   = { id: Date.now() + 1, role: 'assistant', content: '' }
    setMessages(prev => [...prev, userMsg, aiMsg])
    setLoading(true)

    if (!WORKER_URL) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...prev.at(-1), content: 'Chat is not configured yet. Check back soon!' },
      ])
      setLoading(false)
      return
    }

    try {
      const history = messages
        .filter(m => m.id !== 'greeting')
        .map(({ role, content }) => ({ role, content }))

      const res = await fetch(WORKER_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: msg, history }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      await parseSSEStream(res.body, token => {
        setMessages(prev => {
          const last = prev.at(-1)
          return [...prev.slice(0, -1), { ...last, content: last.content + token }]
        })
      })
    } catch (err) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...prev.at(-1), content: 'Something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI chat"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5
                     bg-gray-950 border border-emerald-500/60 rounded-full
                     shadow-lg shadow-black/40
                     hover:border-emerald-400 hover:shadow-emerald-500/25
                     transition-all duration-300 group"
          style={{ boxShadow: '0 0 0 0 rgba(52,211,153,0.4)', animation: 'chatPulse 2.5s ease-out infinite' }}
        >
          <span className="text-emerald-400 font-mono text-sm select-none">&gt;_</span>
          <span className="text-emerald-400 text-xs font-semibold tracking-wide">Ask AI</span>
          {/* NEW badge */}
          <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-gray-950 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
            AI
          </span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[22rem] sm:w-96 h-[30rem] bg-gray-950 border border-emerald-500/30 rounded-lg shadow-2xl shadow-black/60 flex flex-col overflow-hidden">

          {/* Title bar — macOS terminal dots */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800 shrink-0">
            <div className="flex items-center gap-1.5">
              <button onClick={() => setOpen(false)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors" aria-label="Close" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-gray-500 text-xs font-mono">nitin.ai — portfolio chat</span>
            <div className="w-14" /> {/* spacer to centre the title */}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 font-mono text-sm scroll-smooth">

            {messages.map(msg => (
              <div key={msg.id}>
                <div className={`text-xs mb-1 ${msg.role === 'user' ? 'text-gray-600' : 'text-emerald-600'}`}>
                  {msg.role === 'user' ? '~$ you' : 'ai@nitin.sh'}
                </div>
                <p className={`leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'text-gray-300' : 'text-emerald-300'}`}>
                  {msg.content}
                  {/* blinking cursor on the last AI message while loading */}
                  {loading && msg === messages.at(-1) && msg.role === 'assistant' && (
                    <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 align-text-bottom animate-pulse" />
                  )}
                </p>
              </div>
            ))}

            {/* Suggestion chips — shown only before any user message */}
            {messages.length === 1 && (
              <div className="flex flex-col gap-1.5 pt-1">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left text-xs text-gray-500 border border-gray-800 rounded px-3 py-1.5 hover:border-emerald-500/40 hover:text-emerald-400 transition-all font-mono"
                  >
                    ▸ {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <div className="border-t border-gray-800 px-4 py-3 flex items-center gap-2 shrink-0 bg-gray-950">
            <span className="text-emerald-500 font-mono text-sm select-none">~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="ask me anything…"
              disabled={loading}
              className="flex-1 bg-transparent text-gray-300 text-sm font-mono focus:outline-none placeholder:text-gray-700 disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="text-emerald-500 text-xs font-mono disabled:opacity-30 hover:text-emerald-400 transition-colors"
            >
              [↵]
            </button>
          </div>
        </div>
      )}
    </>
  )
}
