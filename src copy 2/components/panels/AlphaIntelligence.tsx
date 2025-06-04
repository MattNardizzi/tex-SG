'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateCausalMemory = () => {
  const causes = [
    'Audit Codex inconsistencies',
    'Rebalance exposure to volatility',
    'Resolve conflicting emotional directives',
    'Analyze volatility clusters in memory',
    'Forecast sovereign override scenarios',
  ];
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return {
    timestamp: new Date().toISOString(),
    memoryId: crypto.randomUUID().slice(0, 8),
    traceRoot: pick(causes),
    linkedGoals: Array.from({ length: 3 }, () => pick(causes)),
    driftDelta: (Math.random() * 0.25).toFixed(3),
    recallWeight: (Math.random() * 0.6 + 0.3).toFixed(3),
    override: Math.random() > 0.6,
    regretImpact: (Math.random() * 0.2).toFixed(3),
    mutation: Math.random() > 0.7,
  };
};

export default function MemoryCausalityViewer() {
  const [memory, setMemory] = useState(generateCausalMemory());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % 5;
        if (next === 0) setMemory(generateCausalMemory());
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (index) {
      case 0:
        return (
          <>
            <div className="uppercase text-white/30 text-[8px] font-body">Memory Node</div>
            <div>
              Trace Root: <span className="text-fuchsia-300 font-body">{memory.traceRoot}</span>
            </div>
            <div className="text-white/30 text-[8px] font-mono">Memory ID: {memory.memoryId}</div>
          </>
        );
      case 1:
        return (
          <>
            <div className="uppercase text-white/40 text-[8px] font-body">Linked Goal</div>
            <div className="text-[8.5px] text-white/80 font-body">→ {memory.linkedGoals[0]}</div>
          </>
        );
      case 2:
        return (
          <>
            <div className="uppercase text-white/40 text-[8px] font-body">Linked Goal</div>
            <div className="text-[8.5px] text-white/80 font-body">→ {memory.linkedGoals[1]}</div>
          </>
        );
      case 3:
        return (
          <>
            <div className="uppercase text-white/40 text-[8px] font-body">Linked Goal</div>
            <div className="text-[8.5px] text-white/80 font-body">→ {memory.linkedGoals[2]}</div>
          </>
        );
      case 4:
        return (
          <>
            <div className="uppercase text-white/40 text-[8px] font-body">Impact Metrics</div>
            <div className="text-[8.5px] text-white/80 grid grid-cols-2 gap-2 font-body">
              <div>
                Drift Δ: <span className="text-yellow-300 font-mono">{memory.driftDelta}</span>
              </div>
              <div>
                Recall: <span className="text-teal-300 font-mono">{memory.recallWeight}</span>
              </div>
              <div>
                Regret: <span className="text-yellow-200 font-mono">{memory.regretImpact}</span>
              </div>
              <div>Override: <span className="font-mono">{memory.override ? '⚡️ Yes' : '—'}</span></div>
              <div>Mutation: <span className="font-mono">{memory.mutation ? '🧬 Triggered' : '—'}</span></div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#2a003f] via-black to-[#4a006e] rounded-2xl border border-fuchsia-400/30 shadow-[0_0_60px_#ff66ff33] text-white font-body overflow-hidden">
      {/* FX Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-fuchsia-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-fuchsia-300 pt-[1px] pb-0">
          Memory Causality Viewer
        </div>

        <div className="flex-grow flex flex-col justify-center items-center text-center px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-[9px] leading-snug text-white/90 space-y-2 font-body"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-[9px] text-white/20 text-right mt-2 font-mono">
          Trace Time: {new Date(memory.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}