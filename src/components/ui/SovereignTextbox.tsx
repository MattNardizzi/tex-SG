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
      const res = await fetch('http://3.16.135.49:5001/think', {
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
    <div className="w-full max-w-3xl mx-auto px-4 mt-8 z-10">
      <div className="bg-black/30 border border-white/10 backdrop-blur-md rounded-2xl shadow-[0_0_40px_#00ffff15] transition-all duration-300 focus-within:shadow-[0_0_60px_#00ffff33] px-6 py-4 space-y-3">

        {/* Message Log */}
        <div className="max-h-[70px] overflow-y-auto text-sm text-white/90 font-light tracking-wide leading-tight space-y-1.5 px-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`transition-all ${msg.sender === 'user' ? 'text-cyan-300' : 'text-gray-300'}`}
            >
              <span className="font-medium">{msg.sender === 'user' ? 'You' : 'Tex'}:</span> {msg.text}
            </div>
          ))}
        </div>

        {/* Input + Button */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={loading ? 'Thinking...' : 'Speak to Tex...'}
            disabled={loading}
            className="flex-1 bg-transparent text-white text-[18px] placeholder-white/40 outline-none font-medium tracking-wide px-2"
            style={{
              fontFamily: `'Inter', system-ui, sans-serif`,
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
            }}
          />

          <button
            onClick={sendMessage}
            aria-label="Send"
            className={`w-[42px] h-[42px] rounded-full grid place-items-center border border-white/10 bg-black/30 backdrop-blur-md shadow-[0_0_10px_#00ffff44] hover:shadow-[0_0_20px_#00ffff66] transition-all ${
              loading ? 'animate-spin' : 'hover:scale-105'
            }`}
          >
            <div className="w-[10px] h-[10px] bg-cyan-300 rounded-full animate-ping" />
          </button>
        </div>
      </div>
    </div>
  );
}