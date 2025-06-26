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
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-purple-500 shadow-[0_0_100px_rgba(180,100,255,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-6"
    >
      {/* 🧠 Text Display */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="init"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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

      {/* 🔲 Animated Compression Grid */}
      <div className="relative w-[320px] h-[260px] z-0 pointer-events-none overflow-hidden">
        {/* Glowing Pixel Grid */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-[4px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-purple-400/20 w-full h-full rounded-sm shadow-[0_0_6px_rgba(200,100,255,0.4)]"
              animate={{
                opacity: [0.08, 0.5, 0.08],
                scale: [1, 0.95, 1],
              }}
              transition={{
                duration: 2.2,
                delay: (i % 6) * 0.1 + Math.floor(i / 6) * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* 🔊 Bright Scanbars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`scan-${i}`}
            className="absolute left-0 right-0 h-[36px] bg-purple-500/25 blur-lg"
            style={{ top: `${i * 72}px` }}
            animate={{
              opacity: [0.05, 0.4, 0.05],
              scaleX: [0.9, 1.05, 0.9],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          />
        ))}

        {/* ✴️ Final Burst */}
        {stage >= 4 && (
          <motion.div
            className="absolute inset-0 bg-purple-300/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* 🧾 Footer Readout */}
      <div className="z-10 text-white/40 italic text-[1.4rem] leading-snug text-center pointer-events-none">
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