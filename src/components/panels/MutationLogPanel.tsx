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
    <div className="w-[340px] bg-black/70 border border-white/10 rounded-xl p-6 backdrop-blur-lg shadow-[0_0_10px_rgba(0,255,255,0.12)] text-base space-y-4">
      {/* Header */}
      <div className="text-[17px] text-cyan-300 font-semibold uppercase tracking-wider">
        TEX: MUTATION LOG
      </div>

      {/* Fixed Height Log Section */}
      <div className="h-[140px] overflow-hidden space-y-2">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className="text-[16px] text-white font-normal leading-snug break-words"
          >
            {log}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-3 text-[12px] text-right text-white/60 italic">
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