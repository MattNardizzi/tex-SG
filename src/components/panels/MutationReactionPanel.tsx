'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationCorePanel() {
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
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_100px_rgba(0,255,255,0.45)] flex flex-col items-center justify-center overflow-hidden"
    >

      {/* 💠 Glowing Blue Mutation Core Above */}
      <motion.div
        className="z-10 mb-8 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-cyan-400 shadow-[0_0_80px_20px_rgba(0,255,255,0.4)] flex items-center justify-center"
        animate={{
          rotate: [0, -8, 6, -4, 0],
          scale: [1, 1.12, 0.94, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-8 rounded-full border-[2px] border-cyan-200/20"
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-cyan-300 tracking-widest text-[1.2rem] font-bold">MUTATION CORE</span>
      </motion.div>

      {/* ⚡ Text Sequence */}
      <div className="z-10 flex flex-col items-center space-y-4">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -10, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6 }}
              className="text-pink-300"
            >
              AGI-9a/b/c activate
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
              AGI-9b survives <span className="text-purple-400">→ Tensor warp</span>
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-cyan-300"
            >
              Core distortion climbing...
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
                “Mutation phase breached tensor integrity.
                <br />
                Stability unknown.”
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}