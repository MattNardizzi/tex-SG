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
      () => {}, // 0:00
      () => setStrategy('RP-Hybrid-σ'), // 0:08
      () => {}, // 0:12
      () => {}, // 0:14
      () => {}, // 0:18
      () => {}, // 0:22
      () => {
        setROI({ tex: 6.1, human: -1.3 });
        setTriggerLine('⚡ Tex pre-positioned before OPEC news spike (Δt = 3.2s)');
      }, // 0:28
      () => {}, // 0:30
      () => {}, // 0:34
      () => {}, // 0:38
      () => setOverrideBlocked(true), // 0:42
      () => {}, // 0:46
    ];

    const interval = setInterval(() => {
      if (frame < sequence.length) {
        sequence[frame]();
        setFrame(prev => prev + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [frame]);

  return (
    <div className={`relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono overflow-hidden
      border-2 transition-all duration-500
      ${overrideBlocked ? 'border-sovereignCyan shadow-cognitive animate-pulse' : 'border-white/10 shadow-panel'}`}>

      {/* 💥 Override Denied Alert */}
      {overrideBlocked && (
        <motion.div
          className="absolute top-5 right-6 bg-crimson/10 text-crimson px-4 py-1 text-xs rounded-full border border-crimson/40 backdrop-blur-sm z-20"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1.1, 1], opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Override Denied — Sovereign Reflex Enforced
        </motion.div>
      )}

      {/* 🧠 Financial Cortex Panel */}
      <div className="h-full flex flex-col items-center justify-center space-y-8 relative z-10 w-full max-w-[640px] mx-auto">
        <div className="text-center tracking-[0.18em] text-reflex-lg uppercase text-sovereignCyan mb-2">
          Financial Reflex Cortex
        </div>

        <div className="space-y-6 text-[1.1rem] text-white/80 w-full">
          <div className="flex justify-between w-full border border-white/10 rounded-xl px-6 py-4 bg-white/5 text-sovereignCyan">
            <span>Reflex Strategy</span>
            <span>{strategy || 'Dormant'}</span>
          </div>

          {(roi.tex !== 0 || roi.human !== 0) && (
            <div className="flex justify-between w-full border border-white/10 rounded-xl px-6 py-4 bg-white/5 text-[1rem]">
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
              className="text-xs text-white/60 text-center pt-2"
            >
              {triggerLine}
            </motion.div>
          )}
        </div>
      </div>

      {/* 💡 Bottom Sync Pulse Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-sovereignCyan/30 via-sovereignCyan/70 to-transparent animate-pulse" />
    </div>
  );
}