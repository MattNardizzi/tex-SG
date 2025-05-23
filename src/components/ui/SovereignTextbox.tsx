'use client'

import { useState } from 'react'

export default function SovereignTextbox() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ sender: 'user' | 'tex'; text: string }[]>([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const updated = [...messages, { sender: 'user', text: input }]
    setMessages(updated)
    setLoading(true)

    try {
      const res = await fetch('http://3.16.135.49:8000/think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await res.json()
      const reply = data.response || '⚠️ No response received.'

      setMessages([...updated, { sender: 'tex', text: reply }])
    } catch (err) {
      setMessages([...updated, { sender: 'tex', text: '❌ Tex encountered a network error.' }])
    }

    setInput('')
    setLoading(false)
  }

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[420px] font-grotesk">
      <div className="relative flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_0_25px_#00ffff08,inset_0_0_2px_#ffffff06] px-4 py-1">
        
        {/* Message Log */}
        <div className="max-h-24 overflow-y-auto text-xs text-white space-y-0.5 mb-1 px-0.5 font-normal">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.sender === 'user' ? 'text-cyan-400' : 'text-gray-300'}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'Tex'}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Input + Glowing Pulse Ring Button */}
        <div className="flex items-center gap-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={loading ? "Thinking..." : "Speak to Tex..."}
            className="flex-1 text-sm bg-transparent outline-none text-white placeholder-white/40 tracking-wide py-[3px]"
            disabled={loading}
          />

          <button
            onClick={sendMessage}
            className={`w-[20px] h-[20px] rounded-full relative ${loading ? 'animate-spin' : 'animate-pulse'} bg-[#1a1a1a] shadow-[0_0_10px_#ccccccaa] p-0`}
            aria-label="Send"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="text-[#cccccc]"
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="currentColor"
                strokeWidth="3.5"
                fill="none"
                strokeDasharray="270"
                strokeDashoffset="30"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
