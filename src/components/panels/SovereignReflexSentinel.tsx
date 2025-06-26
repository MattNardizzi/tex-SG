'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IdentityCompressionPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2700),
      setTimeout(() => setStage(4), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 border-purple-400 shadow-[0_0_100px_rgba(180,100,255,0.45)] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* 🌀 Collapsing Identity Rings */}
      {stage >= 1 && (
        <motion.div
          className="absolute w-[320px] h-[320px] rounded-full border border-purple-400 z-0"
          animate={{
            scale: [1.2, 0.9, 0.7, 0.5],
            opacity: [0.2, 0.4, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* 🌪️ Spiral compression animation */}
      {stage >= 2 && (
        <motion.div
          className="absolute w-[220px] h-[220px] rounded-full border-[2px] border-purple-300 blur-sm"
          initial={{ rotate: 0, scale: 1 }}
          animate={{
            rotate: 720,
            scale: [1, 0.8, 0.5],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: 3,
            ease: 'easeOut',
          }}
        />
      )}

      {/* 💬 Animated Log Output */}
      <div className="z-10 flex flex-col items-center space-y-3 text-center pointer-events-none leading-snug">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="identity"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-purple-300"
            >
              identity_compression()
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="entropy"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              entropy_drift = <span className="text-cyan-300 font-bold">+0.19</span>
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="selfrescue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-emerald-300"
            >
              self_rescue() activated
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="collapse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-white/30 italic text-[2.2rem] pt-6"
            >
              Compression complete.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}