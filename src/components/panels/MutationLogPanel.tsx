'use client';

import { useEffect, useState } from 'react';

export default function MutationLogPanel() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs([generateLog(), generateLog(), generateLog()]);
    const interval = setInterval(() => {
      const newLog = generateLog();
      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[320px] bg-black/40 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-[inset_0_0_3px_#ffffff0a,_0_0_6px_#00ffff15] text-sm space-y-2">
      {/* Header */}
      <div className="text-[12px] text-cyan-300 font-semibold tracking-wide uppercase">
        TEX: MUTATION LOG
      </div>

      {/* Log Entries */}
      <div className="space-y-1">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="text-[11px] text-white/90 font-light leading-tight pl-1"
          >
            {log}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 text-[10px] text-right text-white/40 italic">
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