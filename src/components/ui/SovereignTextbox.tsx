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
      setMessages([
        ...updated,
        { sender: 'tex', text: '❌ Tex encountered a network error.' },
      ]);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8 px-3 z-10">
      <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md shadow-[0_0_30px_#00ffff15,inset_0_0_2px_#ffffff09] p-4 flex flex-col space-y-3 transition-all duration-300 focus-within:shadow-[0_0_60px_#00ffff33]">
        
        {/* Message Log */}
        <div className="max-h-[90px] overflow-y-auto px-1 text-sm leading-tight font-light tracking-wide text-white/90 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`relative transition-all px-2 py-1 rounded-md ${
                msg.sender === 'user'
                  ? 'text-cyan-300 bg-white/5 border border-cyan-500/10'
                  : 'text-gray-300 bg-white/5 border border-white/5'
              }`}
            >
              <span className="font-medium">
                {msg.sender === 'user' ? 'You' : 'Tex'}:
              </span>{' '}
              {msg.text}
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
            className="flex-1 bg-transparent text-white text-[17px] tracking-wide outline-none placeholder-white/40 px-2 py-1 font-medium border-b border-white/10 focus:border-cyan-400 transition-all duration-200"
            style={{
              fontFamily: `'Inter', system-ui, sans-serif`,
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
            }}
          />

          <button
            onClick={sendMessage}
            className={`w-[40px] h-[40px] rounded-full grid place-items-center bg-black/30 backdrop-blur-sm border border-white/10 shadow-[0_0_10px_#00ffff33] transition-all duration-200 ${
              loading ? 'animate-pulse' : 'hover:shadow-[0_0_24px_#00ffff66] hover:scale-105'
            }`}
            aria-label="Send"
          >
            {loading ? (
              <div className="w-2.5 h-2.5 bg-cyan-300 rounded-full animate-ping" />
            ) : (
              <div className="w-[10px] h-[10px] bg-cyan-300 rounded-full shadow-[0_0_8px_#00ffffaa]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}