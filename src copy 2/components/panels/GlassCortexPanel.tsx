'use client';

import React, { useEffect, useState } from 'react';

type PatchEvent = {
  id: number;
  type: 'PATCH' | 'EXPLAIN' | 'MEMORY';
  label: string;
  traceID: string;
};

const typeColors: Record<PatchEvent['type'], string> = {
  PATCH: 'bg-cyan-400/20 border-cyan-300',
  EXPLAIN: 'bg-emerald-400/20 border-emerald-300',
  MEMORY: 'bg-purple-400/20 border-purple-300',
};

export default function GlassCortexPanel() {
  const [events, setEvents] = useState<PatchEvent[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const types: PatchEvent['type'][] = ['PATCH', 'EXPLAIN', 'MEMORY'];
      const labels = {
        PATCH: ['Hotfix Applied', 'Agent Mutation', 'Fork Sync'],
        EXPLAIN: ['XAI Justified', 'Causal Map Linked', 'Decision Trace'],
        MEMORY: ['Recall Bound', 'Anchor Logged', 'Delta Commit'],
      };
      const type = types[Math.floor(Math.random() * types.length)];
      const event: PatchEvent = {
        id: count,
        type,
        label: labels[type][Math.floor(Math.random() * labels[type].length)],
        traceID: `#${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`,
      };

      // ✅ Reinstate strict 6-item guard
      setEvents((prev) => {
        const updated = [event, ...prev];
        return updated.slice(0, 6);
      });

      setCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-black via-indigo-950/30 to-black border border-cyan-400/20 text-white font-mono">

      {/* 🌌 Background Glow + Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute top-1/2 left-1/2 w-44 h-44 -translate-x-1/2 -translate-y-1/2 bg-cyan-300/10 rounded-full blur-[80px]" />
      </div>

      {/* 🧠 Title */}
      <div className="relative z-10 text-center text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold pt-4 pb-1">
        Glass Cortex
      </div>
      <div className="relative z-10 text-center text-[7.25px] text-zinc-400 uppercase pb-3 tracking-widest leading-tight">
        Traceability Lattice · XAI Explanations · Memory Provenance
      </div>

      {/* 🔷 Grid of Events (max 6) */}
      <div className="relative z-10 px-3 pb-4 grid grid-cols-3 grid-rows-2 gap-[6px]">
        {events.map((event) => (
          <div
            key={event.id}
            className={`min-w-0 overflow-hidden rounded-md px-2 py-[5px] text-[6.25px] backdrop-blur-lg border shadow-inner ${typeColors[event.type]}`}
          >
            <div className="flex flex-col font-bold uppercase leading-tight text-white/90 mb-[2px]">
              <span className="truncate">{event.type}</span>
              <span className="text-cyan-200 font-mono text-[6px] truncate">
                {event.traceID}
              </span>
            </div>
            <div className="italic text-white/85 text-[6.5px] l eading-snug tracking-tight">
              ⟶ {event.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}