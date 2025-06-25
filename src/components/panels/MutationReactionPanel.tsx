'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1200),  // Title fade
      setTimeout(() => setStage(2), 2400),  // Line 1
      setTimeout(() => setStage(3), 3600),  // Line 2
      setTimeout(() => setStage(4), 4800),  // Line 3
      setTimeout(() => setStage(5), 6200),  // Final pulse
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_90px_rgba(0,255,255,0.35)] flex flex-col items-center justify-center space-y-6 overflow-hidden"
    >
      {/* Glowing Neural Core */}
      <motion.div
        className="relative w-[160px] h-[160px] flex items-center justify-center mb-4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-[5px] border-cyan-300/60 shadow-[0_0_60px_12px_rgba(34,211,238,0.4)]" />
        <div className="absolute inset-4 rounded-full border-[2px] border-cyan-100/30 animate-pulse" />
        <div className="z-10 text-cyan-300 font-bold text-[1.2rem] tracking-widest">MUTATION</div>
        <motion.div
          className="absolute w-4 h-4 bg-cyan-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          style={{ transformOrigin: '80px 80px' }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="title"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-cyan-200 tracking-widest text-[1.4rem] mb-2"
          >
            MUTATION CORE (C)
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="line-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan-300"
          >
            AGI-9a/b/c activate
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="line-2"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-pink-400"
          >
            AGI-9b survives → <span className="text-white/90">Tensor warp</span>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="line-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-emerald-300"
          >
            Core distortion climbing
          </motion.div>
        )}

        {stage >= 5 && (
          <motion.div
            key="final-flash"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.7, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            className="text-white/60 text-[1.4rem] pt-4 italic"
          >
            reflex voltage: <span className="text-cyan-300">surging...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}