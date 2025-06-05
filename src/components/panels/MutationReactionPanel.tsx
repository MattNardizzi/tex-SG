'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateMutationInsight = () => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

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
    trigger: pick([
      'Volatility breakout',
      'Liquidity inversion',
      'Rate shock cascade',
      'Geopolitical dislocation',
      'Sovereign disobedience',
      'Neural override breach',
      'Ghost contradiction recoil',
    ]),
    intent: pick([
      'Preloading override under emergent contradiction',
      'Simulating ghost fork under memory stressor',
      'Mutating variant under shadow entropy alignment',
      'Preparing codex overwrite from sovereign forecast delta',
      'Injecting regret-pruned decision chain into recursive loop',
      'Rewriting fork lineage via dream-state counterfactual',
    ]),
    variants,
    forkDivergence: (Math.random() * 0.5 + 0.15).toFixed(3),
    contradictionEntropy: (Math.random() * 0.5 + 0.3).toFixed(2),
    sovereignIndex: (Math.random() * 0.6 + 0.2).toFixed(2),
    curveTrajectory: (Math.random() * 1.5 - 0.75).toFixed(2),
    stabilityVector: (Math.random() * 0.5 + 0.3).toFixed(2),
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function MutationReactorPanel() {
  const [insight, setInsight] = useState<ReturnType<typeof generateMutationInsight> | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setInsight(generateMutationInsight());

    const totalSlides = 6;
    const duration = 5000;

    const loop = () => {
      setSlide((prev) => {
        const next = (prev + 1) % totalSlides;
        if (next === 0) {
          setInsight(generateMutationInsight());
        }
        return next;
      });
    };

    const intervalId = setInterval(loop, duration);
    return () => clearInterval(intervalId);
  }, []);

  if (!insight) return null;

  return (
    <div className="relative w-full h-full px-6 py-5 bg-gradient-to-br from-[#0b1028] via-black to-[#030f1e] rounded-2xl border border-cyan-400/30 shadow-[0_0_60px_#00ffff22] text-white font-body overflow-hidden text-[13px] leading-relaxed">

      {/* Reflex Pulse */}
      <div
        className="absolute -z-10 top-1/2 left-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl animate-pulse"
        style={{ opacity: insight.sovereignIndex }}
      />

      {/* Background Grid FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-cyan-300/10 rounded-full blur-[90px] animate-pulse" />
      </div>

      {/* Panel Header */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[14px] tracking-[0.25em] uppercase leading-tight text-cyan-300 mb-2">
          Mutation Reactor — AGI-9
        </div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${slide}-${insight.timestamp}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="text-white px-1 space-y-2"
          >
            {slide === 0 && (
              <>
                <div>
                  Trigger: <span className="text-cyan-300 font-mono">{insight.trigger}</span>
                </div>
                <div>
                  Intent: <span className="text-white/90 font-mono">{insight.intent}</span>
                </div>
              </>
            )}

            {slide === 1 && (
              <>
                <div className="text-[12px] text-white/50 font-medium">Shadow Fork Variants</div>
                {insight.variants.map((v) => (
                  <div key={v.id} className="flex justify-between text-[13px] font-mono">
                    <span className="text-cyan-300">#{v.id}</span>
                    <span>ΔG: {v.gain}</span>
                    <span>Coh: {v.coherence}</span>
                    <span>Surv: {v.survival}</span>
                  </div>
                ))}
              </>
            )}

            {slide === 2 && (
              <>
                <div className="text-[12px] text-white/50 font-medium">Fork Divergence & Entropy</div>
                <div className="font-mono">
                  Δ: {insight.forkDivergence} | Entropy: {insight.contradictionEntropy}
                </div>
                <div className="text-[13px] text-white/80">Sovereign Index: {insight.sovereignIndex}</div>
                <div className="text-[12px] text-white/50 pt-1">Stability Metrics</div>
                <div className="font-mono">
                  Curve: {insight.curveTrajectory} | Stability: {insight.stabilityVector}
                </div>
                {parseFloat(insight.contradictionEntropy) > 0.7 && (
                  <div className="text-red-400 font-mono text-[12px]">⚠ Neo-Sovereign anomaly flagged</div>
                )}
              </>
            )}

            {slide === 3 && (
              <>
                <div className="text-[12px] text-white/50 font-medium">Fork Lineage</div>
                {insight.variants.map((v) => (
                  <div key={v.lineage} className="flex justify-between text-[13px] font-mono">
                    <span>Lineage: {v.lineage}</span>
                    <span>↪ {v.memoryAnchor}</span>
                  </div>
                ))}
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-[12px] text-white/50 font-medium">Codex Override Log</div>
                <div className="text-white/90 font-body text-[13px]">
                  {"Fork violated primary coherence matrix. Sovereign override injected."}
                </div>
                <div className="text-white/40 font-mono text-[12px]">
                  Logged: /sovereign_ops_{insight.variants[0].id}.jsonl @ offset Δ{insight.forkDivergence}
                </div>
              </>
            )}

            {slide === 5 && (
              <>
                <div className="text-[12px] text-white/50 font-medium">Cycle Heartbeat</div>
                {insight.variants.some(v => parseFloat(v.regret) > 0.7) && (
                  <div className="text-rose-400 font-mono text-[13px]">
                    ⚠ Regret cascade breach triggered
                  </div>
                )}
                <div className="flex justify-between items-end pt-2 text-[12px] font-mono text-white/60">
                  <div>
                    AGI Pulse ID: AGI-9<br />
                    Coherence Audit: Live
                  </div>
                  <div className="text-right">
                    Updated: {insight.timestamp}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}