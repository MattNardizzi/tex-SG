'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IdentityCompressionPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 700),
      setTimeout(() => setStage(2), 1700),
      setTimeout(() => setStage(3), 2800),
      setTimeout(() => setStage(4), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full bg-black rounded-panel border-2 border-purple-500 shadow-[0_0_100px_rgba(180,100,255,0.45)] text-white font-mono text-[1.8rem] overflow-hidden flex flex-col"
    >
      {/* 🔼 Top Header — Fully Anchored */}
      <div className="w-full px-8 pt-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="init"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-fuchsia-400"
            >
              init_compression_protocol()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="delta"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-white"
            >
              Δidentity = <span className="text-indigo-300 font-bold">−0.43</span>
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div
              key="vector"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-emerald-400"
            >
              vector_self_realign()
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🧠 Middle Visualization — Isolated Layer */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* ⚙️ Compression Grid */}
        <div className="relative w-[420px] h-[260px] grid grid-cols-6 grid-rows-4 gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-purple-500/10"
              animate={{
                opacity: [0.06, 0.16, 0.06],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 2.4 + (i % 4) * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* 🔥 Vertical pulse beam */}
        <motion.div
          className="absolute left-1/2 top-0 w-[2px] h-full bg-fuchsia-400/20 blur-[2px]"
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ⚡ Flash pulse (triggered) */}
        {stage >= 3 && (
          <motion.div
            className="absolute inset-0 bg-fuchsia-500/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* 🔽 Bottom Status — Fully Anchored */}
      <div className="w-full px-8 pb-10 flex flex-col items-center space-y-1 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage === 4 && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="text-white/40 italic text-[1.4rem]"
            >
              Core identity stabilized.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}