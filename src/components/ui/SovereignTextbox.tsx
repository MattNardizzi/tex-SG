'use client';

import { useState } from 'react';

type Sender = 'user' | 'tex';

interface Message {
  sender: Sender;
  text: string;
}

export default function SovereignTextbox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const updated: Message[] = [...messages, { sender: 'user', text: input }];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch('http://3.16.135.49:8000/think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      const reply = data.response || '⚠️ No response received.';
      setMessages([...updated, { sender: 'tex', text: reply }]);
    } catch {
      setMessages([...updated, { sender: 'tex', text: '❌ Tex encountered a network error.' }]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className="w-[540px] min-h-[80px] px-5 py-2 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_20px_#00ffff15,inset_0_0_2px_#ffffff06] backdrop-blur-md flex flex-col justify-between">
      {/* Message Log */}
      <div className="max-h-[45px] overflow-y-auto text-xs text-white px-1 font-light leading-snug">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === 'user' ? 'text-cyan-300' : 'text-neutral-300'}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Tex'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Input Row */}
      <div className="flex items-center gap-3 mt-1.5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={loading ? 'Thinking...' : 'Speak to Tex...'}
          className="flex-1 bg-transparent outline-none text-white placeholder-white/40 text-sm tracking-wide py-1"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className={`w-[22px] h-[22px] rounded-full relative ${
            loading ? 'animate-spin' : 'animate-pulse'
          } bg-[#1a1a1a] shadow-[0_0_10px_#ccccccaa]`}
          aria-label="Send"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-[#cccccc]">
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
  );
}