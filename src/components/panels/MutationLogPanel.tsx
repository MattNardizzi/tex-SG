'use client';

import { useEffect, useState } from 'react';

export default function MutationLogPanel() {
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
    <div
      className="w-[280px] px-5 py-4 backdrop-blur-sm bg-white/5 rounded-xl shadow-[0_0_12px_#00ffff11] space-y-4 text-white"
      style={{
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Header */}
      <div
        className="text-[15px] font-bold uppercase tracking-wide text-cyan-300"
        style={{ textShadow: '0 0 6px rgba(0,255,255,0.4)' }}
      >
        TEX: MUTATION LOG
      </div>

      {/* Logs */}
      <div className="h-[90px] overflow-hidden space-y-1.5">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="text-[13.25px] font-light leading-snug text-white/90"
          >
            {log}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-1 text-[11px] text-right text-white/40 italic tracking-wide">
        Cognitive Mutation Log
      </div>
    </div>
  );
}

function generateLog(): string {
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