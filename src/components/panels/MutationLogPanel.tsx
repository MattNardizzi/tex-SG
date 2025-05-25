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
    <div className="w-[200px] bg-black/30 text-white p-3 rounded-md border border-white/10 backdrop-blur-md shadow-[inset_0_0_2px_#ffffff05,_0_0_4px_#00ffff10]">
      <div className="text-[9px] text-cyan-200/90 font-semibold uppercase tracking-wider mb-2">
        TEX: SOVEREIGN COGNITION
      </div>

      <div className="space-y-1">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="text-[10px] text-white/80 font-light leading-tight break-words pl-[2px]"
          >
            {log}
          </div>
        ))}
      </div>

      <div className="mt-3 text-[8px] text-right text-neutral-500 italic">
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