'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateMultiworldInsight = () => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const ghostForks = Array.from({ length: 2 }, () => ({
    id: crypto.randomUUID().slice(0, 8),
    divergence: (Math.random() * 1.8 + 0.2).toFixed(2),
    regret: (Math.random() * 0.9).toFixed(2),
    emotion: pick(['resolve', 'fear', 'curiosity']),
    lineage: `g${Math.floor(Math.random() * 4)}.${Math.floor(Math.random() * 10)}`,
    coherenceLoss: (Math.random() * 0.3 + 0.1).toFixed(2),
  }));

  const divergenceScore = (Math.random() * 1.6 + 0.1).toFixed(2);
  const contradictionEntropy = (Math.random() * 0.3).toFixed(3);
  const simulatedRegret = (Math.random() * 0.9).toFixed(2);

  return {
    universe: pick([
      'Post-dollar collapse',
      'Synthetic AI sovereigns rise',
      'Liquidity inversion spiral',
      'Global risk parity unraveling',
      'AGI arbitrage regime',
    ]),
    divergenceScore,
    contradictionEntropy,
    survivalIndex: (Math.random() * 0.3 + 0.7).toFixed(2),
    entangled: Math.random() > 0.5,
    ghostForks,
    simulatedRegret,
    instabilityIndex: (
      parseFloat(divergenceScore) *
      parseFloat(contradictionEntropy) *
      parseFloat(simulatedRegret)
    ).toFixed(2),
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function SomePanel({ theme }: { theme: 'blue' | 'purple' }) {({ theme }: { theme: 'blue' | 'purple' })MultiworldDivergenceMatrix() {
  const [insight, setInsight] = useState<ReturnType<typeof generateMultiworldInsight> | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setInsight(generateMultiworldInsight());

    const durations = Array(6).fill(5000);
    let current = 0;

    const loop = () => {
      setSlide(current);
      if (current === 0) setInsight(generateMultiworldInsight());
      current = (current + 1) % 6;
      setTimeout(loop, durations[current]);
    };

    const initial = setTimeout(loop, durations[0]);
    return () => clearTimeout(initial);
  }, []);

  if (!insight) return null;

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#0b1028] via-black to-[#030f1e] rounded-2xl border border-cyan-400/40 shadow-[0_0_60px_#00ffff33] text-white font-body overflow-hidden text-[10px]">
      
      {/* Entanglement Pulse */}
      <div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] animate-pulse pointer-events-none"
        style={{ backgroundColor: insight.entangled ? 'rgba(255,0,122,0.08)' : 'transparent' }}
      />

      {/* Grid FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-cyan-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-cyan-300 pt-[1px] pb-0">
          Multiworld Divergence Matrix
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1"
          >
            {slide === 0 && (
              <>
                <div className="text-white/90 font-mono">Top Future Universe:</div>
                <div className="text-cyan-300 font-body text-[10.5px]">✳ {insight.universe}</div>
              </>
            )}
            {slide === 1 && (
              <>
                <div>Divergence Score: <span className="text-lime-300 font-mono">{insight.divergenceScore}</span></div>
                <div>Contradiction Entropy: <span className="text-orange-300 font-mono">{insight.contradictionEntropy}</span></div>
                <div>Survival Index: <span className="text-emerald-300 font-mono">{insight.survivalIndex}</span></div>
                <div className="text-white/60 text-[9px] italic">
                  {parseFloat(insight.contradictionEntropy) > 0.25
                    ? '⚠ Forecast instability accelerating.'
                    : '↳ Temporal coherence holding.'}
                </div>
              </>
            )}
            {slide === 2 && (
              <>
                <div className="text-white/40">Shadow Ghost Forks</div>
                {insight.ghostForks.map((f) => (
                  <div key={f.id} className="flex justify-between text-[10px] font-mono">
                    <span className="text-cyan-400">#{f.id}</span>
                    <span>Δ⃗{f.divergence}</span>
                    <span>R: {f.regret}</span>
                    <span>⤷ {f.lineage}</span>
                  </div>
                ))}
                {insight.ghostForks.map(f => (
                  parseFloat(f.coherenceLoss) > 0.25 && parseFloat(f.regret) > 0.7 && (
                    <div key={`warn-${f.id}`} className="text-red-400 text-[10px] font-mono">
                      ⚠ Recursive divergence loop detected
                    </div>
                  )
                ))}
              </>
            )}
            {slide === 3 && (
              <>
                <div className="text-white/40">Causal Entanglement</div>
                <div className="font-mono text-[10px]">
                  {insight.entangled ? (
                    <span className="text-rose-400">⚡ Entangled with Sovereign Instability</span>
                  ) : (
                    <span className="text-white/30">— No sovereign feedback detected</span>
                  )}
                </div>
              </>
            )}
            {slide === 4 && (
              <>
                <div className="text-white/40">Simulation Regret Forecast</div>
                <div className="text-[10px] text-white/80 font-mono">
                  Simulated regret drift: <span className="text-yellow-300">{insight.simulatedRegret}</span>
                </div>
                <div className="text-[10px] text-white/50 font-mono">
                  Instability Index: <span className="text-cyan-300">{insight.instabilityIndex}</span>
                </div>
                <div className="text-white/50 text-[9px] font-mono">
                  Ghost fork coherence drop: {insight.ghostForks[0].coherenceLoss}
                </div>
              </>
            )}
            {slide === 5 && (
              <>
                <div className="text-white/40">Last Evaluation</div>
                <div className="text-right text-white/50 text-[10px] font-mono">
                  {insight.timestamp}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}