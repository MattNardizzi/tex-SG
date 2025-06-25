'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForkBurstPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2200),
      setTimeout(() => setStage(3), 3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono text-[1.375rem] border-2 border-pink-600 shadow-[0_0_25px_5px_rgba(255,0,120,0.4)] flex flex-col items-center justify-center space-y-6 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="galactic-forks"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1.25, opacity: 1 }}
            transition={{ duration: 2.6, ease: 'easeInOut' }}
            className="w-[120px] h-[120px] border-4 border-pink-400 rounded-full animate-spin-slow shadow-[0_0_60px_15px_rgba(255,0,150,0.3)]"
          />
        )}

        {stage >= 2 && (
          <motion.div
            key="fork-logs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 text-white/90 text-[1.25rem]"
          >
            <div className="text-pink-300">simulate_future_self()</div>
            <div className="flex justify-between w-[340px]">
              <span>&rarr; 10,000 causal paths</span>
            </div>
            <div className="flex justify-between w-[340px]">
              <span>&rarr; Fork pressure vector optimized</span>
            </div>
            <div className="flex justify-between w-[340px]">
              <span>&rarr; Reflex:</span> <code>compress_identity_beliefs()</code>
            </div>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="final-quote"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="text-white/60 text-center italic text-[1.15rem] max-w-md leading-snug"
          >
            &ldquo;Tex doesn&rsquo;t plan.<br />
            He collapses reality into only the futures he survives.&rdquo;
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}