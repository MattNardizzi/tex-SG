'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateShadowSurveillance = () => {
  const breaches = [
    'Ghost fork breach on volatility layer',
    'Synthetic alpha duplication attempt',
    'Sovereign override hijack detected',
    'Contradiction drift injection from foreign agent',
    'Fork lineage desync in shadow cluster',
  ];

  const agents = [
    'ghost_fork_7a2f',
    'shadow_clone_x9',
    'aeon_mutant_42',
    'drift_probe_01',
    'fork_infiltrator_delta',
  ];

  const log = Array.from({ length: 2 }, () => ({
    id: crypto.randomUUID().slice(0, 8),
    agent: agents[Math.floor(Math.random() * agents.length)],
    breach: breaches[Math.floor(Math.random() * breaches.length)],
    entropy: (Math.random() * 0.4 + 0.4).toFixed(3),
    stealth: (Math.random() * 0.6 + 0.2).toFixed(2),
    timestamp: new Date().toLocaleTimeString(),
  }));

  return {
    log,
    threatIndex: (Math.random() * 0.7 + 0.3).toFixed(2),
    countermeasure: Math.random() > 0.55,
    signatureHash: crypto.randomUUID().slice(0, 12),
    lastPing: new Date().toLocaleTimeString(),
  };
};

export default function ShadowForkSurveillanceGrid() {
  const [data, setData] = useState(generateShadowSurveillance());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateShadowSurveillance());
    }, 10000);

    const durations = Array(6).fill(5500);
    let current = 0;
    let timeout;

    const advance = () => {
      current = (current + 1) % 6;
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
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#0c0c1c] via-black to-[#1e0032] rounded-2xl border border-fuchsia-400/40 shadow-[0_0_60px_#ff00ff33] text-white font-body overflow-hidden text-[10px]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-fuchsia-300/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-fuchsia-300 pt-[1px] pb-0">
          Shadow Fork Surveillance
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
                <div className="text-white/90 font-mono">⚠ Active Fork Breach Log</div>
                {data.log.map((entry) => (
                  <div key={entry.id} className="text-[10px] font-mono text-white/80">
                    <span className="text-fuchsia-300">#{entry.agent}</span> → {entry.breach}
                  </div>
                ))}
              </>
            )}

            {slide === 1 && (
              <>
                <div className="text-white/40">Entropy + Stealth Index</div>
                {data.log.map((entry) => (
                  <div key={entry.id} className="flex justify-between text-[10px] font-mono">
                    <span className="text-white/60">ΔEntropy: {entry.entropy}</span>
                    <span className="text-white/40">Stealth: {entry.stealth}</span>
                  </div>
                ))}
              </>
            )}

            {slide === 2 && (
              <>
                <div className="text-white/40">Ghost Signature Hash</div>
                <div className="text-[10px] font-mono text-white/80">{data.signatureHash}</div>
                <div className="text-white/60">Threat Index: <span className="text-fuchsia-300">{data.threatIndex}</span></div>
              </>
            )}

            {slide === 3 && (
              <>
                <div className="text-white/40">Countermeasure Protocol</div>
                <div className="font-mono text-[10px]">
                  {data.countermeasure ? (
                    <span className="text-emerald-300">✅ Sovereign Reflex Engaged</span>
                  ) : (
                    <span className="text-white/30">— Passive surveillance mode</span>
                  )}
                </div>
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-white/40">Operator Commentary</div>
                <div className="text-[10px] text-white/90 font-body">
                  "Fork interference confirms Tex’s sovereign loop is under adversarial observation. Reflex loops active."
                </div>
              </>
            )}

            {slide === 5 && (
              <>
                <div className="text-white/40">Last Detection</div>
                <div className="text-right text-white/50 text-[10px] font-mono">
                  {data.lastPing}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}