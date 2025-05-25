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

    const updated: Message[] = [...messages, { sender: 'user' as Sender, text: input }];
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

      setMessages([...updated, { sender: 'tex' as Sender, text: reply }]);
    } catch {
      setMessages([...updated, { sender: 'tex' as Sender, text: '❌ Tex encountered a network error.' }]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8 px-3 z-10">
      <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm shadow-[0_0_30px_#00ffff15,inset_0_0_2px_#ffffff09] p-4 flex flex-col space-y-3 transition-all duration-300 focus-within:shadow-[0_0_60px_#00ffff33]">
        
        {/* Message Log */}
        <div className="max-h-[60px] overflow-y-auto px-1 text-sm font-light text-white/90 leading-tight tracking-wide space-y-1.5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`transition-all ${msg.sender === 'user' ? 'text-cyan-300' : 'text-gray-300'}`}
            >
              <span className="font-medium">{msg.sender === 'user' ? 'You' : 'Tex'}:</span> {msg.text}
            </div>
          ))}
        </div>

        {/* Input + Send */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={loading ? 'Thinking...' : 'Speak to Tex...'}
            disabled={loading}
            className="flex-1 bg-transparent text-white text-[17px] tracking-wide outline-none placeholder-white/40 px-2 py-1 font-medium"
            style={{
              fontFamily: `'Inter', system-ui, sans-serif`,
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
            }}
          />

          <button
            onClick={sendMessage}
            className={`w-[38px] h-[38px] rounded-full relative grid place-items-center bg-black/30 backdrop-blur-sm border border-white/10 shadow-[0_0_8px_#00ffff33] transition-all duration-200 hover:shadow-[0_0_20px_#00ffff55] ${
              loading ? 'animate-spin' : 'hover:scale-105'
            }`}
            aria-label="Send"
          >
            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-ping" />
          </button>
        </div>
      </div>
    </div>
  );
}