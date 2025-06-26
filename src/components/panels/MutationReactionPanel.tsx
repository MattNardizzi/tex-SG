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
      setTimeout(() => setStage(4), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 border-cyan-400 shadow-[0_0_90px_rgba(0,255,255,0.35)] flex flex-col items-center justify-center space-y-6 overflow-hidden"
    >
      {/* 🌌 Sovereign Cyan Core */}
      <motion.div
        className="relative w-[140px] h-[140px] flex items-center justify-center mb-4"
        animate={{
          rotate: 360,
          boxShadow: [
            '0 0 60px 10px rgba(0,255,255,0.4)',
            '0 0 140px 40px rgba(0,255,255,0.6)',
            '0 0 60px 10px rgba(0,255,255,0.4)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Primary bright outer ring */}
        <div className="absolute inset-0 rounded-full border-[4px] border-cyan-300/60 shadow-[0_0_120px_30px_rgba(0,255,255,0.5)]" />
        {/* Secondary halo glow layer */}
        <div className="absolute inset-1 rounded-full border-[2px] border-cyan-100/20 shadow-[0_0_60px_15px_rgba(0,255,255,0.3)]" />
        {/* Label */}
        <div className="z-10 text-cyan-300 font-bold text-[2.6rem] tracking-wide">CORE</div>
        {/* Orbital dot */}
        <motion.div
          className="absolute w-3 h-3 bg-cyan-300 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          style={{ transformOrigin: '70px 70px' }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="mut-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-fuchsia-300"
          >
            AGI-9a/b/c activate
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="mut-2"
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
            key="mut-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-cyan-300"
          >
            Core distortion climbing...
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="mut-quote"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-white/70 italic text-center pt-4 text-[2.2rem] leading-snug"
          >
            “Mutation phase breached tensor integrity.
            <br />Stability unknown.”
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}