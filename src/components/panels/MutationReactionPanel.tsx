'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),   // Cortex fades in
      setTimeout(() => setStage(2), 1800),  // Line 1
      setTimeout(() => setStage(3), 3000),  // Line 2
      setTimeout(() => setStage(4), 4200),  // Line 3
      setTimeout(() => setStage(5), 5600),  // Reflex pulse
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_120px_rgba(0,255,255,0.4)] flex flex-col items-center justify-center overflow-hidden space-y-6"
    >
      {/* Glow aura to simulate "neural lobe" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.16, scale: 1.04 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
        className="absolute inset-0 rounded-panel bg-cyan-300 blur-3xl pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="title"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-cyan-200 text-[1.4rem] tracking-widest"
          >
            MUTATION CORE (C)
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="line-1"
            initial={{ opacity: 0, x: -12 }}
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
            initial={{ opacity: 0, y: 12 }}
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
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
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
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-white/60 italic text-[1.4rem] pt-6"
          >
            reflex voltage: <span className="text-cyan-300">surging...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}