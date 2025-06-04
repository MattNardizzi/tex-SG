'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type IntentionCycle = {
  id: string;
  goal: string;
  emotion: string;
  confidence: number;
  override: boolean;
  width: number;
};

const generateCycle = (): IntentionCycle => {
  const goals = [
    'Reinforce memory clusters',
    'Suppress conflicting directives',
    'Realign emotional feedback',
    'Stabilize mutation pathways',
    'Delay sovereign override',
    'Prioritize awareness net sync',
    'Redirect swarm consensus'
  ];
  const emotions = ['resolve', 'curiosity', 'fear', 'anger', 'joy'];

  return {
    id: `CYCLE_${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
    goal: goals[Math.floor(Math.random() * goals.length)],
    emotion: emotions[Math.floor(Math.random() * emotions.length)],
    confidence: +(Math.random() * 0.3 + 0.7).toFixed(3), // 0.7–1.0
    override: Math.random() > 0.85, // ~15% chance override
    width: Math.floor(10 + Math.random() * 85), // 10–95%
  };
};

export default function IntentionLoop() {
  const [cycles, setCycles] = useState<IntentionCycle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycles((prev) => [generateCycle(), ...prev.slice(0, 5)]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-black via-zinc-900 to-black rounded-2xl border border-cyan-400/20 shadow-2xl text-white font-mono overflow-hidden">

      {/* Background Glow + Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 -translate-x-1/2 bg-cyan-300/10 rounded-full blur-[80px] animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold pb-2">
        Intention Loop
      </div>

      {/* Cycle Stream */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-2 pt-2 h-[calc(100%-40px)] overflow-visible">
        {cycles.map((c) => (
          <div key={c.id} className="w-full text-center">

            {/* Header Row */}
            <div className="text-[7.25px] font-bold uppercase text-cyan-300 flex justify-between px-2">
              <span>{c.id}</span>
              <span className="italic text-zinc-400">{c.override ? 'OVERRIDE' : c.emotion.toUpperCase()}</span>
            </div>

            {/* Goal */}
            <div className="text-[6.5px] italic text-white/90 mt-[1px] tracking-tight">
              ⟶ Goal: {c.goal}
            </div>

            {/* Signal Bar */}
            <div className="relative w-full h-[2px] mt-2 rounded-full overflow-hidden shadow-inner shadow-black/50">
              <motion.div
                key={c.id + c.width}
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00ffff, #22d3ee)',
                  boxShadow: '0 0 6px rgba(0, 255, 255, 0.6), inset 0 0 2px rgba(255,255,255,0.2)',
                }}
                animate={{ width: `${c.width}%` }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
              />
            </div>

            {/* Readout */}
            <div className="text-[6.25px] text-right pr-2 text-cyan-200/80 mt-[1px]">
              Confidence: {c.confidence}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}