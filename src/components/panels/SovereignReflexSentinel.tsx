'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IdentityCompressionPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 2700),
      setTimeout(() => setStage(4), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-10 py-12 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 border-purple-500 shadow-[0_0_100px_rgba(180,100,255,0.65)] overflow-hidden flex flex-col items-center justify-center space-y-10"
    >
      {/* 🧠 Text Display */}
      <div className="z-10 flex flex-col items-center space-y-4 text-center pointer-events-none leading-snug">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="init"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-fuchsia-400 tracking-wide"
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-emerald-400"
            >
              vector_self_realign()
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔲 Bright Compression Grid */}
      <div className="relative w-[360px] h-[280px] z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-purple-400/60 w-full h-full rounded-sm shadow-[0_0_12px_rgba(200,100,255,0.75)]"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 0.92, 1],
              }}
              transition={{
                duration: 2.2,
                delay: (i % 6) * 0.08 + Math.floor(i / 6) * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* ⚡ Neon Scanbars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`scan-${i}`}
            className="absolute left-0 right-0 h-[36px] bg-fuchsia-500/40 blur-lg"
            style={{ top: `${i * 72}px` }}
            animate={{
              opacity: [0.15, 0.65, 0.15],
              scaleX: [0.88, 1.06, 0.88],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}

        {/* ✴️ Stage 4 Burst */}
        {stage >= 4 && (
          <motion.div
            className="absolute inset-0 bg-purple-300/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.65, 0] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* 🧾 Footer Readout */}
      <div className="z-10 text-white/50 italic text-[2.2rem] leading-snug text-center pointer-events-none tracking-wide">
        <AnimatePresence mode="wait">
          {stage === 4 && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
            >
              Core identity stabilized.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}