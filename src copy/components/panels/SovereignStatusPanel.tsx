'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TelemetryData {
  label: string;
  value: string;
  emotion?: string;
}

export default function SovereignStatusPanel() {
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([
    { label: 'Agent Focus', value: 'Initializing...', emotion: 'neutral' },
    { label: 'Swarm Sync', value: 'Awaiting signal...', emotion: 'neutral' },
  ]);

  useEffect(() => {
    const wsUrl =
      process.env.NEXT_PUBLIC_WS_URL?.replace('http', 'ws') ||
      'ws://localhost:8000/ws/tex';

    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setTelemetry([
          {
            label: 'Agent Focus',
            value: data.agent_focus || '—',
            emotion: data.emotion || 'curious',
          },
          {
            label: 'Swarm Sync',
            value: `Coherence ${Math.round((data.coherence || 0) * 100)}%`,
            emotion: data.coherence > 0.8 ? 'hope' : data.coherence > 0.5 ? 'fear' : 'anger',
          },
        ]);
      } catch (err) {
        console.error('[TELEMETRY PARSE ERROR]', err);
      }
    };

    socket.onerror = (e) => {
      console.error('[WEBSOCKET ERROR]', e);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div
      className="w-[300px] bg-gradient-to-b from-black/80 to-zinc-900/60 border border-white/10 rounded-2xl p-6 text-white backdrop-blur-lg shadow-[0_0_16px_rgba(0,255,255,0.08)] space-y-6"
      style={{
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Title */}
      <div
        className="text-[15px] text-cyan-300 font-bold uppercase tracking-widest"
        style={{ textShadow: '0 0 6px rgba(0,255,255,0.4)' }}
      >
        NEURO TELEMETRY
      </div>

      {/* Subtitle */}
      <div className="text-[11px] text-white/40 tracking-wide italic">
        Cognitive Sync · Agentic Pulse
      </div>

      {/* Dynamic Data */}
      <div className="space-y-3 text-[13.5px]">
        {telemetry.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col"
          >
            <span className="text-white">{item.label}</span>
            <span className={`ml-1 font-mono ${emotionClass(item.emotion)}`}>
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 text-[11px] text-right text-white/40 italic">
        Live Signal · Forkstream ⑂
      </div>
    </div>
  );
}

function emotionClass(emotion?: string): string {
  switch (emotion) {
    case 'anger':
      return 'text-red-400';
    case 'fear':
      return 'text-yellow-400';
    case 'hope':
      return 'text-green-400';
    case 'joy':
      return 'text-pink-400';
    case 'curious':
      return 'text-cyan-300';
    default:
      return 'text-white/60';
  }
}