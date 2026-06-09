import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, AlertCircle, Lightbulb, RefreshCw, Heart } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { sendMessage, SUGGESTED_QUESTIONS } from '../utils/anthropicApi.js'
import './ChatPage.css'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: `Hello! I'm **GynoGuideAI**, your specialized gynecology assistant. 👋

I can help you with:
- **Understanding conditions** like PCOS, endometriosis, fibroids, and more
- **Medication information** for gynecological treatments
- **Menstrual and hormonal health** questions
- **Preventive care** guidance — screenings, vaccines, checkup schedules
- **Fertility and reproductive health** topics

Feel free to ask me anything related to women's reproductive health. I'll provide evidence-based, compassionate answers.

> ⚕️ *Reminder: I provide educational information only — always consult a gynecologist for personal medical advice.*

What would you like to know?`,
}

export default function ChatPage() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const rawKey = import.meta.env.VITE_OPENROUTER_API_KEY || ''
  const apiKeyMissing = !rawKey.trim() || rawKey.trim() === 'your_openrouter_api_key_here'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (text = input.trim()) => {
    if (!text || loading) return
    setError(null)
    setInput('')

    const userMsg = { id: Date.now(), role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = [...messages.filter(m => m.id !== 'welcome'), userMsg]
        .map(m => ({ role: m.role, content: m.content }))

      const response = await sendMessage(history)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
      }])
    } catch (err) {
      if (err.message === 'API_KEY_MISSING') {
        setError('API key not configured. Add VITE_OPENROUTER_API_KEY=sk-or-... to .env.local and restart the dev server.')
      } else {
        setError(`OpenRouter error: ${err.message}`)
      }
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE])
    setError(null)
    setInput('')
  }

  return (
    <div className="chat-page">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="chat-sidebar__header">
          <Lightbulb size={16} />
          <span>Suggested questions</span>
        </div>
        <div className="chat-sidebar__questions">
          {SUGGESTED_QUESTIONS.map(q => (
            <button
              key={q}
              className="suggestion-btn"
              onClick={() => handleSend(q)}
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>
        <button className="btn btn-ghost chat-sidebar__reset" onClick={handleReset}>
          <RefreshCw size={14} />
          New conversation
        </button>
      </aside>

      {/* Main chat */}
      <div className="chat-main">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header__info">
            <div className="chat-header__avatar">
              <Heart size={18} fill="currentColor" />
            </div>
            <div>
              <h2>GynoGuideAI Assistant</h2>
              <span className="chat-header__status">
                <span className="chat-header__dot" />
                Online · Gynecology Specialist
              </span>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={handleReset} title="New conversation">
            <RefreshCw size={16} />
          </button>
        </div>

        {/* API key warning */}
        {apiKeyMissing && (
          <div className="chat-warning">
            <AlertCircle size={16} />
            <div>
              <strong>API Key Required</strong>
              <p>Create <code>.env.local</code> in your project root and add:<br/>
              <code>VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here</code><br/>
              Then restart the dev server. Get your key at <strong>openrouter.ai/keys</strong></p>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message message--${msg.role}`}>
              <div className="message__avatar">
                {msg.role === 'assistant'
                  ? <Heart size={16} fill="currentColor" />
                  : <User size={16} />
                }
              </div>
              <div className="message__bubble">
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message message--assistant">
              <div className="message__avatar">
                <Heart size={16} fill="currentColor" />
              </div>
              <div className="message__bubble message__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {error && (
            <div className="chat-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <div className="chat-input-wrap">
            <textarea
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a gynecological condition, medication, or symptom…"
              rows={1}
              disabled={loading}
            />
            <button
              className="chat-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="chat-input-hint">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  )
}