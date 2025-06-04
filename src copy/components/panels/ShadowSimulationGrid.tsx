'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type ShadowFork = {
  id: string;
  variant: string;
  emotion: string;
  status: string;
  width: number;
};

const generateFork = (): ShadowFork => {
  const variants = ['contrarian', 'strategic', 'rogue', 'neutral', 'adaptive'];
  const emotions = ['resolve', 'curiosity', 'fear', 'anger', 'joy'];
  const statuses = ['thinking', 'forked', 'collapsed', 'merged', 'succeeded'];

  return {
    id: `FORK_${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
    variant: variants[Math.floor(Math.random() * variants.length)],
    emotion: emotions[Math.floor(Math.random() * emotions.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    width: Math.floor(5 + Math.random() * 90), // guaranteed visible
  };
};

export default function ShadowSimulation() {
  const [forks, setForks] = useState<ShadowFork[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setForks((prev) => [generateFork(), ...prev.slice(0, 5)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-black via-zinc-900 to-black rounded-2xl border border-cyan-400/20 shadow-2xl text-white font-mono overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 -translate-x-1/2 bg-cyan-300/10 rounded-full blur-[80px] animate-pulse" />
      </div>

      {/* Title */}
      <div className="relative z-10 text-center text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold pb-2">
        Shadow Simulation
      </div>

      {/* Loop */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-2 pt-2 h-[calc(100%-40px)] overflow-visible">
        {forks.map((f) => (
          <div key={f.id} className="w-full text-center">

            <div className="text-[7.25px] font-bold uppercase text-cyan-300 flex justify-between px-2">
              <span>{f.id}</span>
              <span className="italic text-zinc-400">{f.emotion}</span>
            </div>

            <div className="text-[6.5px] italic text-white/90 mt-[1px] tracking-tight">
              ⟶ Variant: {f.variant} · Status: {f.status}
            </div>

            {/* ✅ THIS BAR WORKS */}
            <div className="relative w-full h-[2px] mt-2 rounded-full overflow-hidden shadow-inner shadow-black/50">
              <motion.div
                key={f.id + f.width}
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00ffff, #22d3ee)',
                  boxShadow: '0 0 6px rgba(0, 255, 255, 0.6), inset 0 0 2px rgba(255,255,255,0.2)',
                }}
                animate={{ width: `${f.width}%` }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
              />
            </div>

            <div className="text-[6.25px] text-right pr-2 text-cyan-200/80 mt-[1px]">
              ∆ Divergence: {f.width}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}