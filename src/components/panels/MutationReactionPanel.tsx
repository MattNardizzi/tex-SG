'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 3000),
      setTimeout(() => setStage(4), 4200),
      setTimeout(() => setStage(5), 5600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
      className="relative w-full h-full px-10 py-10 rounded-panel bg-black text-white font-mono text-[1.7rem] border-2 border-cyan-500 shadow-[0_0_180px_rgba(0,255,255,0.25)] overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Spinning mutation core ring */}
      <motion.div
        className="absolute w-[260px] h-[260px] border-[2px] border-cyan-400/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-cyan-300 text-[1.4rem] tracking-widest"
          >
            MUTATION CORE (C)
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="line-1"
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-cyan-200"
          >
            AGI–9a/b/c activate
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="line-2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-pink-400"
          >
            AGI–9b survives → <span className="text-white">Tensor warp</span>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="line-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-emerald-300"
          >
            Core distortion climbing
          </motion.div>
        )}

        {stage >= 5 && (
          <motion.div
            key="voltage"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-white/70 italic text-[1.25rem] pt-6"
          >
            reflex voltage: <span className="text-cyan-300">surging...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}