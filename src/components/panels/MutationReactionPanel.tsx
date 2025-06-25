'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),  // Cortex header
      setTimeout(() => setStage(2), 2000),  // Line 1: AGI activate
      setTimeout(() => setStage(3), 3100),  // Line 2: survives
      setTimeout(() => setStage(4), 4300),  // Line 3: distortion
      setTimeout(() => setStage(5), 5700),  // Reflex voltage
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.3, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_90px_rgba(0,255,255,0.35)] flex flex-col justify-center items-center overflow-hidden space-y-6"
    >
      {/* Bioelectric pulse overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 rounded-panel pointer-events-none bg-cyan-300 blur-2xl opacity-25"
      />

      {/* Simulated cortex strip */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        className="absolute top-1/2 left-0 right-0 h-[3px] bg-cyan-500/60 origin-left"
      />

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="title"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan-200 text-[1.4rem] tracking-widest"
          >
            MUTATION CORE (C)
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="line-1"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan-300"
          >
            AGI-9a/b/c activate
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="line-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-pink-400"
          >
            AGI-9b survives → <span className="text-white/90">Tensor warp</span>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="line-3"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-emerald-300"
          >
            Core distortion climbing
          </motion.div>
        )}

        {stage >= 5 && (
          <motion.div
            key="reflex-voltage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
            className="pt-6 text-white/60 italic text-[1.4rem]"
          >
            reflex voltage: <span className="text-cyan-300">surging...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}