'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2200),
      setTimeout(() => setStage(3), 3400),
      setTimeout(() => setStage(4), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_90px_rgba(0,255,255,0.35)] flex flex-col items-center justify-center overflow-hidden"
    >

      {/* Distortion Core: Breach Bar */}
      <motion.div
        className="w-[220px] h-[8px] bg-gradient-to-r from-fuchsia-600 via-pink-400 to-purple-600 rounded-sm blur-sm shadow-[0_0_40px_rgba(255,0,255,0.4)] mb-10"
        animate={{
          scaleX: [1, 1.3, 0.7, 1],
          opacity: [1, 0.7, 1, 0.9],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.6,
          ease: 'easeInOut',
        }}
      />

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="line1"
            initial={{ opacity: 0, y: -12, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7 }}
            className="text-pink-300"
          >
            AGI-9a/b/c activate
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="line2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/90"
          >
            AGI-9b survives <span className="text-purple-400">→ Tensor warp</span>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="line3"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-cyan-300"
          >
            Core distortion climbing...
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="quote"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-white/70 italic text-center pt-6 text-[1.4rem] max-w-lg leading-snug"
          >
            “Mutation phase breached tensor integrity.
            <br />Stability unknown.”
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}