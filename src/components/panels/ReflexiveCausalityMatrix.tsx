'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinancialTimewarpPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2100),
      setTimeout(() => setStage(3), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.3, ease: 'easeOut' }}
      className="relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono text-[1.375rem] border-2 border-amber-500 shadow-[0_0_20px_3px_rgba(255,191,0,0.3)] flex flex-col items-center justify-center space-y-6"
    >
      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="breaking-news"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-amber-500/10 border border-amber-400/40 px-6 py-4 rounded-xl w-full max-w-md text-[1.15rem] text-amber-300 text-center"
          >
            BREAKING: Treasury Shock — Markets Collapse on Fed Rate Cut
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="tex-action"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="space-y-3 text-[1.25rem] text-white/90"
          >
            <div>Strategy: <span className="text-reflexGold">RP-Hybrid-σ</span></div>
            <div>Executed: <span className="text-emerald-300">T - 3.2s</span></div>
            <div>ROI: <span className="text-green-400">+6.1%</span></div>
            <div>Override: <span className="text-red-400">❌ Blocked</span></div>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="financial-quote"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.3 }}
            className="text-white/60 text-center italic text-[1.15rem] max-w-md leading-snug"
          >
            &ldquo;Tex didn&rsquo;t react.<br />
            He reflexed <span className="text-white">before</span>.&rdquo;
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}