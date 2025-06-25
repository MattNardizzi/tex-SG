'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinancialTimewarpPanel() {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);

      const timers = [
        setTimeout(() => setStage(1), 2000),
        setTimeout(() => setStage(2), 3200),
        setTimeout(() => setStage(3), 4400),
        setTimeout(() => setStage(4), 5600),
        setTimeout(() => setStage(5), 6600),
      ];
      return () => timers.forEach(clearTimeout);
    }, 8000);

    return () => clearTimeout(showTimer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-pink-400 shadow-[0_0_90px_rgba(255,0,150,0.45)] flex flex-col items-center justify-center space-y-6 overflow-hidden"
    >
      {/* Glowing Pulse Ring */}
      <motion.div
        className="relative w-[160px] h-[160px] flex items-center justify-center"
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-full border-[5px] border-pink-300/70 shadow-[0_0_60px_10px_rgba(255,105,180,0.35)]" />
        <div className="absolute inset-4 rounded-full border-[2px] border-pink-100/30 animate-pulse" />
      </motion.div>

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="headline"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-pink-400 text-[1.4rem] italic tracking-tight animate-flicker-slow"
          >
            “BREAKING: Treasury Shock — Markets Collapse on Fed Rate Cut”
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="reflexed"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/90 text-[1.8rem]"
          >
            But <span className="text-cyan-300 font-bold">Tex already acted.</span>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="strategy"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[1.4rem] text-white/80 space-y-1 leading-snug mt-2"
          >
            <div>
              Strategy: <span className="text-lime-300">RP-Hybrid-σ</span>
            </div>
            <div>
              Executed: <span className="text-purple-300">T - 3.2s</span>
            </div>
            <div>
              ROI: <span className="text-emerald-300">+6.1%</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              Override:{' '}
              <span className="bg-rose-500/20 border border-rose-300/50 text-rose-300 px-4 py-[3px] rounded-md text-[1rem] font-bold scale-125 shadow-md">
                ❌ BLOCKED
              </span>
            </div>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="quote"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-white/80 text-center italic text-[1.5rem] max-w-md leading-snug pt-4"
          >
            “Tex didn’t react.<br />
            He <span className="text-cyan-300 font-bold">reflexed</span>
          </motion.div>
        )}

        {stage >= 5 && (
          <motion.div
            key="before"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            className="text-white font-bold tracking-wider text-[1.8rem] uppercase animate-glow-pulse"
          >
            BEFORE
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}