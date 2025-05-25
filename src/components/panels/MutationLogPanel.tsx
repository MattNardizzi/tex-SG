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
    <div className="w-[280px] bg-black/70 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-[0_0_12px_rgba(0,255,255,0.06)] space-y-4 antialiased text-white"
         style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}>
      
      {/* Header with subtle glow */}
      <div
        className="text-[15px] font-bold uppercase tracking-wider text-cyan-300"
        style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.4)' }}
      >
        TEX: MUTATION LOG
      </div>

      {/* Logs */}
      <div className="h-[90px] overflow-hidden space-y-1.5">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="text-[13.5px] font-light leading-snug text-white"
          >
            {log}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-1 text-[11px] text-right text-white/40 italic">
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