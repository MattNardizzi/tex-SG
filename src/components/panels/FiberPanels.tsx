'use client';

import { Html } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function MutationLogPanelR3F() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs([generateLog(), generateLog(), generateLog()]);
    const interval = setInterval(() => {
      const newLog = generateLog();
      setLogs((prev) => [newLog, ...prev.slice(0, 2)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Html position={[-1.5, 1.5, 0]} transform>
      <div className="w-[180px] bg-black/20 text-white p-2 rounded border border-white/10 backdrop-blur-sm shadow-[inset_0_0_2px_#ffffff03,_0_0_3px_#00ffff06]">
        <div className="text-[8px] text-cyan-200/80 font-semibold uppercase tracking-wider mb-1">
          TEX: SOVEREIGN COGNITION
        </div>
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="text-[9px] text-white/75 font-light leading-tight whitespace-normal break-words"
          >
            {log}
          </div>
        ))}
        <div className="mt-2 text-[7px] text-right text-neutral-500 italic">
          Cognitive Mutation Log
        </div>
      </div>
    </Html>
  );
}

function generateLog() {
  const samples = [
    'Agent 0: aggression spike → 0.63',
    'Agent 2: curiosity spike → 0.74',
    'Memory stored: bias = aggressive',
    'Memory stored: fear ↑, resolve ↑',
    'Trait rewrite: greed suppressed',
    'Emotion path split → anger | hope',
    'Cortex divergence: Agent 3',
    'Swarm snapshot: 22:47:01',
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}

export function SovereignStatusPanelR3F() {
  const [forkstreamData, setForkstreamData] = useState([
    { label: 'Dominant Trait', value: 'Loading...' },
    { label: 'Agent Focus', value: 'Loading...' },
    { label: 'Swarm Status', value: 'Loading...' },
  ]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/tex');
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setForkstreamData([
          { label: 'Dominant Trait', value: data.dominant_trait || '—' },
          { label: 'Agent Focus', value: data.agent_focus || '—' },
          {
            label: 'Swarm Status',
            value: `Coherence ${Math.round((data.coherence || 0) * 100)}%`,
          },
        ]);
      } catch (err) {
        console.error('WebSocket parse error:', err);
      }
    };
    return () => socket.close();
  }, []);

  return (
    <Html position={[1.5, 1.5, 0]} transform>
      <div className="w-[180px] bg-black/20 text-white p-2 rounded border border-white/10 backdrop-blur-sm shadow-[inset_0_0_2px_#ffffff03,_0_0_3px_#00ffff06]">
        <div className="text-[8px] text-cyan-200/80 font-semibold uppercase tracking-wider mb-1">
          TEX: SOVEREIGN COGNITION
        </div>
        <div className="text-[7px] text-white/40 font-medium tracking-wide mb-1">
          Godmind · Forkstream ⚂
        </div>
        {forkstreamData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="flex justify-between text-[9px] text-white/80"
          >
            <span>{item.label}</span>
            <span className="text-cyan-200/90">{item.value}</span>
          </motion.div>
        ))}
        <div className="mt-2 text-[7px] text-right text-neutral-500 italic">
          Sovereign Interface · Live Sync
        </div>
      </div>
    </Html>
  );
}

export function SovereignTextboxR3F() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'tex'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const updated = [...messages, { sender: 'user', text: input }];
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
    <Html position={[0, -1.4, 0]} transform>
      <div className="w-[90vw] max-w-[420px] bg-white/5 border border-white/10 backdrop-blur-md rounded-xl shadow-[0_0_25px_#00ffff08,inset_0_0_2px_#ffffff06] px-4 py-1 font-grotesk">
        <div className="max-h-24 overflow-y-auto text-xs text-white space-y-0.5 mb-1 px-0.5 font-normal">
          {messages.map((msg, i) => (
            <div key={i} className={msg.sender === 'user' ? 'text-cyan-400' : 'text-gray-300'}>
              <strong>{msg.sender === 'user' ? 'You' : 'Tex'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={loading ? 'Thinking...' : 'Speak to Tex...'}
            className="flex-1 text-sm bg-transparent outline-none text-white placeholder-white/40 tracking-wide py-[3px]"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className={`w-[20px] h-[20px] rounded-full relative ${loading ? 'animate-spin' : 'animate-pulse'} bg-[#1a1a1a] shadow-[0_0_10px_#ccccccaa] p-0`}
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
    </Html>
  );
}