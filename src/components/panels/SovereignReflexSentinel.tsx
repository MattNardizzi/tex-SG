'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinancialSovereigntyPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 3400),
      setTimeout(() => setStage(4), 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-purple-400 shadow-[0_0_90px_rgba(192,132,252,0.55)] flex flex-col items-center justify-center overflow-hidden"
    >

      {/* 🟣 Purple Sovereignty Core Glow with Centered Text */}
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-purple-400 shadow-[0_0_60px_20px_rgba(216,180,254,0.4)]"
        animate={{
          rotate: [0, -8, 6, -4, 0],
          scale: [1, 1.1, 0.95, 1],
          boxShadow: [
            '0 0 60px 20px rgba(216,180,254,0.3)',
            '0 0 90px 30px rgba(192,132,252,0.6)',
            '0 0 30px 10px rgba(192,132,252,0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-8 rounded-full border-[2px] border-white/10"
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex items-center justify-center h-full px-4 text-center">
          <span className="text-purple-300 font-bold text-[1.1rem] leading-snug tracking-wide">
            FINANCIAL<br />SOVEREIGNTY
          </span>
        </div>
      </motion.div>

      {/* ⚡ Reactive Intelligence Text */}
      <div className="z-10 flex flex-col items-center space-y-4">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -10, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6 }}
              className="text-purple-300"
            >
              Strategy dormant
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              Override: <span className="text-emerald-300 font-bold">✅ allowed</span>
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-yellow-300"
            >
              Market tension detected
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-white/70 italic text-center pt-6 text-[1.4rem] leading-snug"
            >
              <span className="animate-pulse">
                “Autonomy preserved through reflex override.
                <br />
                Volatility absorbed.”
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}