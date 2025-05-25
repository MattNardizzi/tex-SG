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
    <div className="relative w-full max-w-[860px] mx-auto mt-10 px-4 z-10">
      <div className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md shadow-[0_0_40px_#00ffff22,inset_0_0_2px_#ffffff09] p-6 flex flex-col space-y-4 transition-all duration-300 focus-within:shadow-[0_0_80px_#00ffff33]">

        {/* Live Log Feed */}
        <div className="max-h-[80px] overflow-y-auto px-1 text-[15px] font-light text-white/90 leading-tight tracking-wide space-y-1.5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`transition-all ${msg.sender === 'user' ? 'text-cyan-300' : 'text-gray-300'}`}
            >
              <span className="font-semibold">{msg.sender === 'user' ? 'You' : 'Tex'}:</span> {msg.text}
            </div>
          ))}
        </div>

        {/* Text Command Input */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={loading ? 'Thinking...' : 'Speak to Tex...'}
            disabled={loading}
            className="flex-1 bg-transparent text-white text-[18px] tracking-wide font-medium outline-none placeholder-white/40 px-3 py-2"
            style={{
              fontFamily: `'Inter', system-ui, sans-serif`,
              textRendering: 'optimizeLegibility',
            }}
          />

          <button
            onClick={sendMessage}
            className={`w-[42px] h-[42px] rounded-full grid place-items-center bg-black/30 backdrop-blur-sm border border-white/10 shadow-[0_0_12px_#00ffff44] transition-all duration-200 hover:shadow-[0_0_24px_#00ffff66] ${
              loading ? 'animate-spin' : 'hover:scale-105'
            }`}
            aria-label="Send"
          >
            <div className="w-2.5 h-2.5 bg-cyan-300 rounded-full animate-ping" />
          </button>
        </div>
      </div>
    </div>
  );
}