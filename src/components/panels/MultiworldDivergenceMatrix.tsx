'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generateMultiworldInsight = () => {
  const ghostForks = Array.from({ length: 2 }, () => ({
    id: Math.random().toString(36).slice(2, 10),
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

export default function MultiworldDivergenceMatrix() {
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
    <div className="relative w-full h-full px-6 py-5 rounded-2xl bg-black border-[1.5px] border-[#00f0ff22] shadow-[0_0_120px_#000000f0] text-white font-sans overflow-hidden text-[16px] leading-[1.4]">
      
      {/* 🔵 Center Pulse Line */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ff88] to-black blur-[1px] opacity-90 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-mono text-[18px] tracking-[0.25em] uppercase text-[#00f0ff] mb-1">
          Multiworld Divergence Matrix
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1.5"
          >
            {slide === 0 && (
              <>
                <div className="text-white/90 font-mono">Top Future Universe:</div>
                <div className="text-[#b14dff] font-body text-[16px]">✳ {insight.universe}</div>
              </>
            )}
            {slide === 1 && (
              <>
                <div>Divergence Score: <span className="text-[#00f0ff] font-mono">{insight.divergenceScore}</span></div>
                <div>Contradiction Entropy: <span className="text-[#ffaa44] font-mono">{insight.contradictionEntropy}</span></div>
                <div>Survival Index: <span className="text-[#00f0ff] font-mono">{insight.survivalIndex}</span></div>
                <div className="text-white/60 text-[15px] italic">
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
                  <div key={f.id} className="flex justify-between text-[15px] font-mono">
                    <span className="text-[#00f0ff]">#{f.id}</span>
                    <span>Δ⃗{f.divergence}</span>
                    <span>R: {f.regret}</span>
                    <span>⤷ {f.lineage}</span>
                  </div>
                ))}
                {insight.ghostForks.map(f => (
                  parseFloat(f.coherenceLoss) > 0.25 && parseFloat(f.regret) > 0.7 && (
                    <div key={`warn-${f.id}`} className="text-red-400 text-[14px] font-mono">
                      ⚠ Recursive divergence loop detected
                    </div>
                  )
                ))}
              </>
            )}
            {slide === 3 && (
              <>
                <div className="text-white/40">Causal Entanglement</div>
                <div className="font-mono text-[15px]">
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
                <div className="text-[15px] text-white/80 font-mono">
                  Simulated regret drift: <span className="text-yellow-300">{insight.simulatedRegret}</span>
                </div>
                <div className="text-[15px] text-white/50 font-mono">
                  Instability Index: <span className="text-[#00f0ff]">{insight.instabilityIndex}</span>
                </div>
                <div className="text-white/50 text-[14px] font-mono">
                  Ghost fork coherence drop: {insight.ghostForks[0].coherenceLoss}
                </div>
              </>
            )}
            {slide === 5 && (
              <>
                <div className="text-white/40">Last Evaluation</div>
                <div className="text-right text-white/50 text-[15px] font-mono">
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