'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinancialTimewarpPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 2000),  // Headline
      setTimeout(() => setStage(2), 3200),  // Reflex decision
      setTimeout(() => setStage(3), 4400),  // Strategy + data
      setTimeout(() => setStage(4), 5600),  // Reflex quote
      setTimeout(() => setStage(5), 6600),  // BEFORE
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.6rem] border-2 border-pink-400/40 shadow-[0_0_60px_rgba(255,0,122,0.15)] flex flex-col items-center justify-center space-y-6 overflow-hidden"
    >
      {/* No spinning pulse here, so just content blocks */}

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="headline"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-pink-400 text-[1.1rem] italic"
          >
            “BREAKING: Treasury Shock — Markets Collapse on Fed Rate Cut”
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="reflexed"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/90"
          >
            But <span className="text-cyan-300 font-semibold">Tex already acted</span>.
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="strategy"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-white/80 space-y-1 leading-tight"
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-white/85 text-center italic text-[1.2rem] leading-snug max-w-md pt-4"
          >
            “Tex didn’t react.<br />
            He <span className="text-cyan-300 font-bold">reflexed</span>
          </motion.div>
        )}

        {stage >= 5 && (
          <motion.div
            key="before"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="text-center pt-3 text-white font-bold tracking-widest text-[1.45rem] uppercase animate-pulse-glitch"
          >
            before
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}