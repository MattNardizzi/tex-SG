'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FinancialTimewarpPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 2000), // headline
      setTimeout(() => setStage(2), 3000), // reflex
      setTimeout(() => setStage(3), 4000), // strategy
      setTimeout(() => setStage(4), 5200), // quote intro
      setTimeout(() => setStage(5), 6200), // "before"
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-[46%] h-full px-10 py-12 bg-gradient-to-l from-black via-black/90 to-transparent text-white font-mono border-l-[3px] border-pink-500/50 shadow-[-20px_0_80px_rgba(255,0,122,0.35)] flex flex-col justify-center space-y-8 z-30 relative overflow-hidden">

      {stage >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-pink-400 text-[1.1rem] italic relative"
        >
          “BREAKING: Treasury Shock — Markets Collapse on Fed Rate Cut”
          <motion.div
            className="absolute left-0 bottom-0 h-[2px] bg-pink-500/40 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
          />
        </motion.div>
      )}

      {stage >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-white/90 text-[1.2rem]"
        >
          But <span className="text-cyan-300 font-semibold">Tex already acted</span>.
        </motion.div>
      )}

      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-white/70 space-y-1.5"
        >
          <div>Strategy: <span className="text-lime-300">RP-Hybrid-σ</span></div>
          <div>Executed: <span className="text-purple-300">T - 3.2s</span></div>
          <div>ROI: <span className="text-emerald-300">+6.1%</span></div>
          <div>Override: <span className="text-rose-300 bg-rose-500/20 px-2 py-[1px] rounded-md border border-rose-300/40 text-xs">❌ BLOCKED</span></div>
        </motion.div>
      )}

      {stage >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-6 text-white/85 italic text-[1.1rem] leading-snug max-w-md"
        >
          “Tex didn’t react.<br />
          He <span className="text-cyan-300 font-bold">reflexed</span>
        </motion.div>
      )}

      {stage >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="text-center pt-3 text-white font-bold tracking-widest text-[1.45rem] uppercase animate-pulse-glitch"
        >
          before
        </motion.div>
      )}
    </div>
  );
}