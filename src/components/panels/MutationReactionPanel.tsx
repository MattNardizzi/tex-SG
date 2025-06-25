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
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_180px_rgba(0,255,255,0.45)] flex flex-col items-center justify-center overflow-hidden space-y-6"
    >
      {/* Mutation Ring Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        className="absolute w-[260%] h-[260%] border-[2px] border-cyan-500/10 rounded-full blur-2xl opacity-20"
      />

      {/* Neural Lobe Glow */}
      <motion.div
        initial={{ opacity: 0.04 }}
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-panel bg-cyan-400 blur-[120px] pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="title"
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-cyan-300 text-[1.4rem] tracking-[0.25em] drop-shadow-md"
          >
            MUTATION CORE (C)
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="line-1"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-cyan-200"
          >
            AGI-9a/b/c activate
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="line-2"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-pink-400"
          >
            AGI-9b survives → <span className="text-white/90">Tensor warp</span>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="line-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-white/70 italic text-[1.45rem] pt-6"
          >
            reflex voltage: <span className="text-cyan-300">surging...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}