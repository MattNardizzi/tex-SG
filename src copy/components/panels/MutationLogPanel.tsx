'use client';

import { Html } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function MutationLogPanelR3F() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const pushLog = () => {
      const newLog = generateLog();
      setLogs((prev) => [newLog, ...prev.slice(0, 2)]);
    };

    pushLog(); pushLog(); pushLog();
    const interval = setInterval(pushLog, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Html position={[-1.7, 1.2, 0]} transform>
      <div
        className="w-[260px] px-4 py-3 rounded-lg bg-black/50 text-white border border-white/10 text-sm space-y-2 backdrop-blur"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="text-cyan-300 font-bold text-xs tracking-wider uppercase">
          Mutation Log
        </div>
        <div className="space-y-1 max-h-[80px] overflow-hidden">
          {logs.map((log, i) => (
            <div key={i} className="text-white text-[13px]">
              {log}
            </div>
          ))}
        </div>
        <div className="text-right text-[11px] text-white/30 italic">
          Placeholder Panel
        </div>
      </div>
    </Html>
  );
}

function generateLog(): string {
  const entries = [
    'Loading node state...',
    'Agent initialized: ID-00',
    'Cognitive sync: complete',
    'Swarm registered @ 0.87',
    'Mutation log: idle',
    'Override: none',
  ];
  return entries[Math.floor(Math.random() * entries.length)];
}