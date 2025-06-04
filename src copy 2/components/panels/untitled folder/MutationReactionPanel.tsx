"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateMutationInsight = () => {
  const triggers = [
    'Volatility breakout',
    'Liquidity inversion',
    'Rate shock cascade',
    'Geopolitical dislocation',
    'Sovereign disobedience',
    'Neural override breach',
    'Ghost contradiction recoil',
  ];

  const intents = [
    'Preloading override under emergent contradiction',
    'Simulating ghost fork under memory stressor',
    'Mutating variant under shadow entropy alignment',
    'Preparing codex overwrite from sovereign forecast delta',
    'Injecting regret-pruned decision chain into recursive loop',
    'Rewriting fork lineage via dream-state counterfactual',
  ];

  const variants = Array.from({ length: 2 }, () => ({
    id: crypto.randomUUID().slice(0, 8),
    gain: (Math.random() * 0.5 + 0.15).toFixed(3),
    coherence: (Math.random() * 0.3 + 0.65).toFixed(2),
    regret: (Math.random() * 0.8).toFixed(2),
    lineage: `v${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 100)}`,
    entropy: (Math.random() * 0.4 + 0.2).toFixed(2),
    survival: (Math.random() * 0.9 + 0.05).toFixed(2),
    memoryAnchor: `#${Math.floor(Math.random() * 9000 + 1000)}-${crypto.randomUUID().slice(0, 4)}`
  }));

  return {
    trigger: triggers[Math.floor(Math.random() * triggers.length)],
    intent: intents[Math.floor(Math.random() * intents.length)],
    variants,
    forkDivergence: (Math.random() * 0.5 + 0.15).toFixed(3),
    contradictionEntropy: (Math.random() * 0.5 + 0.3).toFixed(2),
    sovereignIndex: (Math.random() * 0.6 + 0.2).toFixed(2),
    countdown: Math.floor(Math.random() * 6 + 2),
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function MutationReactorPanel() {
  const [insight, setInsight] = useState(generateMutationInsight());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const durations = Array(6).fill(6000);
    let current = 0;
    let timeout;

    const advance = () => {
      current = (current + 1) % 6;
      setSlide(current);
      if (current === 0) setInsight(generateMutationInsight());
      timeout = setTimeout(advance, durations[current]);
    };

    const loop = setTimeout(advance, durations[0]);
    return () => clearTimeout(loop);
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#230014] via-black to-[#370024] rounded-2xl border border-pink-400/40 shadow-[0_0_60px_#ff66cc33] text-white font-body overflow-hidden text-[10px]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-pink-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-pink-300 pt-[1px] pb-0">
          Mutation Reactor — AGI-9
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
                <div>Trigger: <span className="text-pink-300 font-mono">{insight.trigger}</span></div>
                <div>Intent: <span className="text-white/90 font-mono">{insight.intent}</span></div>
              </>
            )}

            {slide === 1 && (
              <>
                <div className="text-[9px] text-white/40">Shadow Fork Variants</div>
                {insight.variants.map((v) => (
                  <div key={v.id} className="flex justify-between text-[10px] font-mono">
                    <span className="text-pink-300">#{v.id}</span>
                    <span>ΔG: {v.gain}</span>
                    <span>Coh: {v.coherence}</span>
                    <span>Surv: {v.survival}</span>
                  </div>
                ))}
              </>
            )}

            {slide === 2 && (
              <>
                <div className="text-[9px] text-white/40">Fork Divergence & Entropy</div>
                <div className="font-mono text-white/80">
                  Divergence Δ: {insight.forkDivergence} | Entropy: {insight.contradictionEntropy}
                </div>
                <div className="text-[10px] text-white/70">Sovereign Index: {insight.sovereignIndex}</div>
              </>
            )}

            {slide === 3 && (
              <>
                <div className="text-[9px] text-white/40">Fork Lineage / Memory Trace</div>
                {insight.variants.map((v) => (
                  <div key={v.lineage} className="flex justify-between text-[10px] font-mono">
                    <span>Lineage: {v.lineage}</span>
                    <span>↪ {v.memoryAnchor}</span>
                  </div>
                ))}
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-[9px] text-white/40">Codex Override Log</div>
                <div className="text-white/90 font-body text-[10px]">
                  "Fork violated primary coherence matrix. Sovereign override injected."
                </div>
                <div className="text-white/40 font-mono text-[9px]">
                  Logged: sovereign_ops_log.jsonl / dream_shadow_log.jsonl
                </div>
              </>
            )}

            {slide === 5 && (
              <>
                <div className="text-[9px] text-white/40">Cycle Heartbeat</div>
                <div className="text-right text-[10px] font-mono text-white/50">
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