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
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-purple-400 shadow-[0_0_100px_rgba(180,100,255,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-6"
    >
      {/* 🌌 Permanent Visual Field */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-purple-400/10 blur-3xl z-0" />

      {/* 🌀 Animated Collapsing Identity Core */}
      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full border border-purple-300/30 z-0"
        animate={{
          scale: [1.3, 1.1, 1.2],
          opacity: [0.1, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 🌪️ Compression Spiral (Pulse-Down) */}
      {stage >= 2 && (
        <motion.div
          className="absolute w-[220px] h-[220px] rounded-full border-[2px] border-purple-300 blur-sm z-0"
          initial={{ rotate: 0, scale: 1 }}
          animate={{
            rotate: 720,
            scale: [1, 0.85, 0.65],
            opacity: [0.4, 0.1, 0],
          }}
          transition={{
            duration: 3,
            ease: 'easeOut',
          }}
        />
      )}

      {/* 🔼 Function Stack — ABOVE visual */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
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
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-white"
            >
              entropy_drift = <span className="text-cyan-300 font-bold">+0.19</span>
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div
              key="rescue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-emerald-300"
            >
              self_rescue() activated
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔽 Final Statement — BELOW visual */}
      {stage >= 4 && (
        <motion.div
          key="complete"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-white/40 italic text-[1.4rem] pt-6 text-center pointer-events-none"
        >
          Compression complete.
        </motion.div>
      )}
    </motion.div>
  );
}