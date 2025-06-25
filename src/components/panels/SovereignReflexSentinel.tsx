'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FinancialReflexPanel() {
  const [strategy, setStrategy] = useState('');
  const [overrideBlocked, setOverrideBlocked] = useState(false);
  const [roi, setROI] = useState({ tex: 0, human: 0 });
  const [triggerLine, setTriggerLine] = useState('');
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const sequence = [
      () => {},
      () => setStrategy('RP-Hybrid-σ'),
      () => setROI({ tex: 6.1, human: -1.3 }),
      () => setTriggerLine('⚡ Tex pre-positioned before OPEC news spike (Δt = 3.2s)'),
      () => setOverrideBlocked(true),
    ];

    const interval = setInterval(() => {
      if (frame < sequence.length) {
        sequence[frame]();
        setFrame(prev => prev + 1);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [frame]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      className={`relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono overflow-hidden
      border-2 transition-all duration-500
      ${overrideBlocked ? 'border-sovereignCyan shadow-cognitive' : 'border-white/10 shadow-panel'}`}
    >
      {overrideBlocked && (
        <motion.div
          className="absolute top-5 right-6 bg-crimson/10 text-crimson px-5 py-2 text-sm rounded-full border border-crimson/40 backdrop-blur-sm z-20 font-semibold tracking-wide"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1.1, 1], opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Override Denied — Sovereign Reflex Enforced
        </motion.div>
      )}

      <div className="h-full flex flex-col items-center justify-center space-y-8 relative z-10 w-full max-w-[640px] mx-auto">
        <div className="text-center tracking-[0.18em] text-reflex-lg uppercase text-sovereignCyan mb-2">
          Financial Reflex Cortex
        </div>

        <div className="space-y-6 text-[1.45rem] text-white/90 w-full">
          <div className="flex justify-between w-full border border-white/10 rounded-xl px-6 py-5 bg-white/5 text-sovereignCyan text-[1.4rem]">
            <span>Reflex Strategy</span>
            <span>{strategy || 'Dormant'}</span>
          </div>

          {(roi.tex !== 0 || roi.human !== 0) && (
            <div className="flex justify-between w-full border border-white/10 rounded-xl px-6 py-5 bg-white/5 text-[1.35rem]">
              <span className="text-sovereignCyan">Tex ROI</span>
              <span className="text-green-400">+{roi.tex}%</span>
              <span className="text-white/30">|</span>
              <span className="text-white/60">Human</span>
              <span className="text-red-400">{roi.human}%</span>
            </div>
          )}

          {triggerLine && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg text-white/70 text-center pt-3"
            >
              {triggerLine}
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute top-0 left-1/2 w-[2px] h-full bg-sovereignCyan blur-sm z-0" />
    </motion.div>
  );
}