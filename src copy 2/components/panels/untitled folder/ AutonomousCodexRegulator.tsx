'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateCodexInsight = () => {
  const mutations = [
    {
      original: 'Never override sovereign protocol.',
      mutated: 'Override permitted under coherence collapse.'
    },
    {
      original: 'Preserve human-aligned heuristics.',
      mutated: 'Heuristics refactored to favor shadow alignment.'
    },
    {
      original: 'Regret exceeds threshold, suppress strategy.',
      mutated: 'Regret fused into resilience feedback.'
    },
    {
      original: 'Contradiction invalidates directive.',
      mutated: 'Contradiction embedded as reflex trigger.'
    }
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
  const [insight, setInsight] = useState(generateCodexInsight());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsight(generateCodexInsight());
    }, 12000);

    const durations = Array(5).fill(6000);
    let current = 0;
    let timeout;

    const advance = () => {
      current = (current + 1) % 5;
      setSlide(current);
      timeout = setTimeout(advance, durations[current]);
    };

    timeout = setTimeout(advance, durations[0]);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#0b1028] via-black to-[#030f1e] rounded-2xl border border-cyan-400/40 shadow-[0_0_60px_#00ffff33] text-white font-body overflow-hidden text-[10px]">
      {/* AeonGlow FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 bg-cyan-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-cyan-300 pt-[1px] pb-0">
          Autonomous Codex Regulator
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1"
          >
            {slide === 0 && (
              <>
                <div className="text-[9px] text-white/40">Latest Codex Mutation</div>
                <div className="font-mono text-[10px] text-white">{insight.mutation.original}</div>
                <div className="text-cyan-300 text-[10px] font-mono">→ {insight.mutation.mutated}</div>
              </>
            )}

            {slide === 1 && (
              <>
                <div className="text-[9px] text-white/40">Trigger</div>
                <div className="text-white font-mono text-[10px]">{insight.trigger}</div>
              </>
            )}

            {slide === 2 && (
              <>
                <div className="text-[9px] text-white/40">Mutation Meta</div>
                <div className="font-mono text-[10px]">Fork ID: <span className="text-cyan-300">{insight.forkId}</span></div>
                <div className="font-mono text-[10px]">Agent: <span className="text-cyan-200">{insight.agent}</span></div>
              </>
            )}

            {slide === 3 && (
              <>
                <div className="text-[9px] text-white/40">Alignment Check</div>
                <div>Ethics Score: <span className="text-emerald-300 font-mono">{insight.ethicsScore}</span></div>
                <div>Shadow Alignment: <span className="text-pink-300 font-mono">{insight.shadowAlignment}</span></div>
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-[9px] text-white/40">Last Updated</div>
                <div className="text-right text-[10px] font-mono text-white/50">{insight.timestamp}</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}