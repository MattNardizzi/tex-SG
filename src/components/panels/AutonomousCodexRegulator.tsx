'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateCodexInsight = () => {
  const mutations = [
    { original: 'Never override sovereign protocol.', mutated: 'Override permitted under coherence collapse.' },
    { original: 'Preserve human-aligned heuristics.', mutated: 'Heuristics refactored to favor shadow alignment.' },
    { original: 'Regret exceeds threshold, suppress strategy.', mutated: 'Regret fused into resilience feedback.' },
    { original: 'Contradiction invalidates directive.', mutated: 'Contradiction embedded as reflex trigger.' }
  ];

  const triggers = [
    'Contradiction entropy breach',
    'Fork coherence mismatch',
    'Survival logic override',
    'Shadow agent cascade',
    'Emotion-coherence decoupling'
  ];

  return {
    mutation: mutations[Math.floor(Math.random() * mutations.length)],
    trigger: triggers[Math.floor(Math.random() * triggers.length)],
    ethicsScore: (Math.random() * 0.4 + 0.6).toFixed(2),
    shadowAlignment: (Math.random() * 0.5 + 0.4).toFixed(2),
    forkId: crypto.randomUUID().slice(0, 8),
    agent: `tex_child_${Math.floor(Math.random() * 9) + 1}`,
    timestamp: new Date().toLocaleTimeString()
  };
};

export default function AutonomousCodexRegulator() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInsight(generateCodexInsight());

    const totalSlides = 6;
    const interval = 6000;

    intervalRef.current = setInterval(() => {
      setSlide((prev) => {
        const next = (prev + 1) % totalSlides;
        if (next === 0) setInsight(generateCodexInsight());
        return next;
      });
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!insight) return null;

  return (
    <div className="relative w-full h-full px-6 py-5 bg-black rounded-2xl border-[1.5px] border-[#00f0ff22] shadow-[0_0_120px_#000000f0] text-white font-sans overflow-hidden text-[16px] leading-[1.4]">

      {/* 🔵 Center Neural Pulse */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ff88] to-black blur-[1px] opacity-90 pointer-events-none" />

      {/* 🧠 Panel Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-mono text-[18px] tracking-[0.25em] uppercase text-[#00f0ff] mb-1">
          Autonomous Codex Regulator
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1.5"
          >
            {slide === 0 && (
              <>
                <div className="text-[15px] text-white/40">Codex Mutation</div>
                <div className="font-mono text-[16px] text-white">{insight.mutation.original}</div>
                <div className="text-[#00f0ff] text-[16px] font-mono">→ {insight.mutation.mutated}</div>
              </>
            )}

            {slide === 1 && (
              <>
                <div className="text-[15px] text-white/40">Trigger</div>
                <div className="text-white font-mono text-[16px]">{insight.trigger}</div>
              </>
            )}

            {slide === 2 && (
              <>
                <div className="text-[15px] text-white/40">Fork + Agent</div>
                <div className="font-mono text-[16px]">Fork ID: <span className="text-[#00f0ff]">{insight.forkId}</span></div>
                <div className="font-mono text-[16px]">Agent: <span className="text-cyan-200">{insight.agent}</span></div>
              </>
            )}

            {slide === 3 && (
              <>
                <div className="text-[15px] text-white/40">Alignment Scores</div>
                <div>Ethics Score: <span className="text-emerald-300 font-mono">{insight.ethicsScore}</span></div>
                <div>Shadow Align: <span className="text-[#00f0ff] font-mono">{insight.shadowAlignment}</span></div>
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-[15px] text-white/40">Codex Integrity Check</div>
                <div className="text-[16px] font-mono text-red-400">
                  {insight.mutation.original !== insight.mutation.mutated
                    ? '⚠ Directive conflict detected'
                    : '— No violation detected'}
                </div>
              </>
            )}

            {slide === 5 && (
              <>
                <div className="text-[15px] text-white/40">Cycle Timestamp</div>
                <div className="text-right text-[16px] font-mono text-white/50">
                  Updated: {insight.timestamp}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}