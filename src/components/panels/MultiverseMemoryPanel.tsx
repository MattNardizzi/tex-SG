// components/panels/MultiverseMemoryPanel.tsx

'use client';

import React from 'react';

type MemoryUniverse = {
  id: string;
  divergence: number;
  chaos: boolean;
};

type MultiverseMemoryProps = {
  universes: MemoryUniverse[];
  timestamp: string;
};

export default function MultiverseMemoryPanel({ universes, timestamp }: MultiverseMemoryProps) {
  return (
    <div className="bg-black/80 border border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-3xl text-white space-y-4 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-widest text-lime-400/80">
        🧬 Multiverse Memory Map
      </div>

      <ul className="space-y-2 text-sm font-mono text-white/80">
        {universes.map((u) => (
          <li
            key={u.id}
            className={`flex justify-between items-center px-3 py-2 rounded border ${
              u.chaos ? 'border-red-500 bg-red-800/20' : 'border-lime-500 bg-lime-800/10'
            }`}
          >
            <span>Universe: {u.id.slice(0, 8)}</span>
            <span>Δ: {u.divergence.toFixed(3)} | Chaos: {u.chaos ? 'Yes' : 'No'}</span>
          </li>
        ))}
      </ul>

      <div className="text-xs text-white/40 mt-4">Snapshot: {timestamp}</div>
    </div>
  );
}