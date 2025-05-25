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
    <div className="relative w-full max-w-3xl mx-auto mt-10 px-4 z-10">
      <div
        className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-5 space-y-4 shadow-[0_0_40px_#00ffff22,inset_0_0_3px_#00ffff33]"
        style={{
          transition: 'all 0.3s ease',
          fontFamily: `'Inter', system-ui, sans-serif`,
        }}
      >
        {/* Message Log */}
        <div className="max-h-[90px] overflow-y-auto text-sm text-white/90 leading-snug tracking-wide space-y-1.5 px-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`transition-all ${
                msg.sender === 'user' ? 'text-cyan-300' : 'text-gray-300'
              }`}
            >
              <span className="font-medium">{msg.sender === 'user' ? 'You' : 'Tex'}:</span>{' '}
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input + Send */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={loading ? 'Thinking...' : 'Speak to Tex...'}
            disabled={loading}
            className="flex-1 bg-transparent text-white text-[17px] tracking-wide outline-none placeholder-white/40 px-3 py-2 font-medium"
            style={{
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
            }}
          />

          <button
            onClick={sendMessage}
            className={`w-[42px] h-[42px] rounded-full relative grid place-items-center bg-black/40 backdrop-blur-sm border border-white/10 shadow-[0_0_8px_#00ffff33] transition-all duration-200 ${
              loading ? 'animate-pulse' : 'hover:shadow-[0_0_20px_#00ffff88] hover:scale-105'
            }`}
            aria-label="Send"
          >
            <div
              className="w-[10px] h-[10px] bg-cyan-300 rounded-full"
              style={{
                boxShadow: '0 0 6px rgba(0,255,255,0.5)',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}