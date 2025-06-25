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
        setTimeout(() => setStage(1), 2500),
        setTimeout(() => setStage(2), 3800),
        setTimeout(() => setStage(3), 5000),
        setTimeout(() => setStage(4), 6200),
        setTimeout(() => setStage(5), 7600),
      ];
      return () => timers.forEach(clearTimeout);
    }, 8000); // Delay full entrance

    return () => clearTimeout(showTimer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-10 py-14 rounded-panel bg-black text-white font-mono text-[1.65rem] border-2 border-pink-400/40 shadow-[0_0_80px_rgba(255,0,122,0.2)] flex flex-col items-center justify-center space-y-7 overflow-hidden"
    >
      {/* Cinematic Pulse Ring */}
      <motion.div
        className="absolute top-4 w-[200px] h-[200px] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute inset-0 rounded-full border-[5px] border-pink-300/40 shadow-[0_0_100px_20px_rgba(255,20,147,0.25)]" />
        <div className="absolute inset-6 rounded-full border-[2px] border-pink-100/20 animate-pulse" />
      </motion.div>

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="headline"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-pink-400 text-[1.2rem] italic tracking-tight animate-flicker-slow"
          >
            “BREAKING: Treasury Shock — Markets Collapse on Fed Rate Cut”
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="reflexed"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white/90 text-[1.5rem]"
          >
            But <span className="text-cyan-300 font-bold">Tex already acted.</span>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="strategy"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white/80 text-[1.15rem] space-y-1 leading-snug mt-2"
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
            <div>
              Override: <span className="bg-rose-500/20 border border-rose-300/50 text-rose-300 px-2 py-[1px] rounded-md text-xs">❌ BLOCKED</span>
            </div>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="quote"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-white/80 text-center italic text-[1.3rem] leading-snug max-w-md pt-6"
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