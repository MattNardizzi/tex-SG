'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorldSimulationPanel() {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);

      const timers = [
        setTimeout(() => setStage(1), 1800),
        setTimeout(() => setStage(2), 3000),
        setTimeout(() => setStage(3), 4200),
        setTimeout(() => setStage(4), 5600),
      ];
      return () => timers.forEach(clearTimeout);
    }, 13600); // ⏱️ Delay: 13.6s

    return () => clearTimeout(showTimer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.3, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-purple-400 shadow-[0_0_90px_rgba(192,132,252,0.55)] flex flex-col items-center justify-center space-y-6 overflow-hidden"
    >
      {/* Glowing Cosmic Spinner */}
      <motion.div
        className="relative w-[160px] h-[160px] flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-[5px] border-purple-300/70 shadow-[0_0_60px_10px_rgba(216,180,254,0.4)]" />
        <div className="absolute inset-4 rounded-full border-[2px] border-purple-100/30 animate-pulse blur-sm" />
        <div className="z-10 text-purple-300 font-bold text-[1.3rem] tracking-wide">FORK</div>
      </motion.div>

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="log-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-purple-300"
          >
            simulate_future_self()
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="log-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between w-[420px] text-purple-100"
          >
            <span className="text-white/90">&rarr; 10,000 causal paths</span>
            <span className="text-pink-300">✓</span>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="log-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between w-[420px] text-purple-100"
          >
            <span className="text-white/90">&rarr; Fork pressure vector optimized</span>
            <span className="text-yellow-300">↑</span>
          </motion.div>
        )}

        {stage >= 4 && (
          <>
            <motion.div
              key="log-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-emerald-300"
            >
              &rarr; Reflex:{' '}
              <span className="text-orange-300">compress_identity_beliefs()</span>
            </motion.div>

            <motion.div
              key="final-quote"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-white/80 text-center italic text-[1.5rem] max-w-md leading-snug pt-6"
            >
              <motion.div
                className="animate-flicker-slow"
                style={{ animation: 'flicker 2.5s linear infinite' }}
              >
                &ldquo;Tex doesn’t plan.<br />
                He collapses reality into only the futures he survives.&rdquo;
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}