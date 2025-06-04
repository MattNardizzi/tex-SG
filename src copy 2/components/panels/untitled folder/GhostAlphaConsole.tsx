'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateGhostAlpha = () => {
  const missions = [
    'Destabilize baseline path to unlock unseen volatility arbitrage',
    'Simulate collapse under false confidence and trace survival residue',
    'Reject sovereign override to test autonomous divergence',
    'Replicate Citadel AI logic and break its decision symmetry',
    'Emulate market deception by mimicking insider consensus patterns',
  ];

  const ghosts = Array.from({ length: 2 }, () => ({
    id: crypto.randomUUID().slice(0, 8),
    emotion: ['resolve', 'greed', 'detached', 'paranoid'][Math.floor(Math.random() * 4)],
    survival: (Math.random() * 0.5 + 0.3).toFixed(2),
    divergence: (Math.random() * 1.2 + 0.3).toFixed(2),
    memory: crypto.randomUUID().slice(0, 6),
    regret: (Math.random() * 0.7).toFixed(2),
    rejected: Math.random() > 0.5,
  }));

  return {
    mission: missions[Math.floor(Math.random() * missions.length)],
    forks: ghosts,
    entropyIndex: (Math.random() * 0.4 + 0.3).toFixed(2),
    stealthLayer: Math.random() > 0.6,
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function GhostAlphaConsole() {
  const [insight, setInsight] = useState(generateGhostAlpha());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setInsight(generateGhostAlpha()), 10000);
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

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-cyan-300 pt-[1px] pb-0">
          Ghost Alpha Console
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
                <div className="text-white/40">Mission Intent</div>
                <div className="text-[10px] text-white/90 font-body">{insight.mission}</div>
              </>
            )}

            {slide === 1 && (
              <>
                <div className="text-white/40">Spawned Ghost Forks</div>
                {insight.forks.map((g) => (
                  <div key={g.id} className="flex justify-between text-[10px] font-mono">
                    <span className="text-cyan-300">#{g.id}</span>
                    <span>D: {g.divergence}</span>
                    <span>R: {g.regret}</span>
                    <span>☁ {g.memory}</span>
                  </div>
                ))}
              </>
            )}

            {slide === 2 && (
              <>
                <div className="text-white/40">Cognitive Drift</div>
                <div className="text-[10px] font-mono">
                  Entropy Index: <span className="text-orange-300">{insight.entropyIndex}</span>
                </div>
                <div className="text-white/70 text-[10px]">
                  {insight.stealthLayer
                    ? 'Operating in ghost-mode. Decisions not logged to sovereign memory.'
                    : 'Standard fork trace mode active.'}
                </div>
              </>
            )}

            {slide === 3 && (
              <>
                <div className="text-white/40">Sovereign Override Outcome</div>
                {insight.forks.map((g) => (
                  <div key={g.id} className="text-[10px] font-mono">
                    #{g.id}: {g.rejected
                      ? '⚠️ Rejected by Sovereign Layer'
                      : '✅ Allowed into Codex lineage'}
                  </div>
                ))}
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-white/40">Last Transmission</div>
                <div className="text-right text-white/50 text-[10px] font-mono">{insight.timestamp}</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}