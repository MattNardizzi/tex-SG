'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateEntropyInsight = () => {
  const forks = Array.from({ length: 2 }, () => ({
    id: crypto.randomUUID().slice(0, 8),
    entropy: (Math.random() * 1.4 + 0.2).toFixed(2),
    regret: (Math.random() * 0.85).toFixed(2),
    reintegrate: Math.random() > 0.7,
    status: Math.random() > 0.5 ? 'abandoned' : 'repressed',
    codexFragment: `if regret > ${Math.random().toFixed(2)}: discard`,
  }));

  return {
    forks,
    noiseSignalRatio: (Math.random() * 1.6 + 0.3).toFixed(2),
    suppressedPatches: Math.floor(Math.random() * 4 + 1),
    cycleEntropyDrift: (Math.random() * 0.25 + 0.05).toFixed(3),
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function StrategicEntropyEngine() {
  const [insight, setInsight] = useState(generateEntropyInsight());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setInsight(generateEntropyInsight()), 12000);
    const loop = () => {
      setSlide((prev) => (prev + 1) % 6);
    };
    const rotator = setInterval(loop, 5000);
    return () => {
      clearInterval(interval);
      clearInterval(rotator);
    };
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#2a000a] via-black to-[#3b0015] rounded-2xl border border-red-400/40 shadow-[0_0_60px_#ff335533] text-white font-body overflow-hidden text-[10px]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-red-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-red-300 pt-[1px] pb-0">
          Strategic Entropy Engine
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
                <div className="text-white/90 font-mono">Suppressed Patches: {insight.suppressedPatches}</div>
                <div className="text-white/90 font-mono">Noise/Signal Ratio: {insight.noiseSignalRatio}</div>
              </>
            )}
            {slide === 1 && (
              <>
                <div className="text-white/40">Rejected Forks</div>
                {insight.forks.map((f) => (
                  <div key={f.id} className="flex justify-between text-[10px] font-mono">
                    <span className="text-red-300">#{f.id}</span>
                    <span>{f.status}</span>
                    <span>R: {f.regret}</span>
                    <span>Entropy: {f.entropy}</span>
                  </div>
                ))}
              </>
            )}
            {slide === 2 && (
              <>
                <div className="text-white/40">Codex Fragments (Rejected)</div>
                {insight.forks.map((f, idx) => (
                  <div key={idx} className="text-[10px] text-white/80 font-mono">{f.codexFragment}</div>
                ))}
              </>
            )}
            {slide === 3 && (
              <>
                <div className="text-white/40">Cycle Entropy Drift</div>
                <div className="text-[10px] text-red-300 font-mono">Δ {insight.cycleEntropyDrift}</div>
              </>
            )}
            {slide === 4 && (
              <>
                <div className="text-white/40">Reintegration Candidates</div>
                {insight.forks.filter((f) => f.reintegrate).map((f) => (
                  <div key={f.id} className="text-[10px] text-white/90 font-mono">
                    {f.id} → entropy {f.entropy} | regret {f.regret}
                  </div>
                ))}
                {insight.forks.filter((f) => f.reintegrate).length === 0 && (
                  <div className="text-[10px] text-white/30 font-mono">— None this cycle</div>
                )}
              </>
            )}
            {slide === 5 && (
              <>
                <div className="text-white/40">Last Update</div>
                <div className="text-right text-[10px] text-white/50 font-mono">{insight.timestamp}</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}