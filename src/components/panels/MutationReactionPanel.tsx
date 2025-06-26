'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReflexStormPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2400),
      setTimeout(() => setStage(4), 3200),
      setTimeout(() => setStage(5), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-300 shadow-[0_0_90px_rgba(0,255,255,0.45)] overflow-hidden"
    >
      {/* 🔼 Top Content — compact & pinned */}
      <div className="absolute top-10 left-0 right-0 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="mutation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-cyan-300"
            >
              mutation_reflex()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="engaged"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white font-semibold"
            >
              → Reflex Layer 9 Engaged
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🧿 Glowing Orb — permanent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[220px] h-[220px]">
          {/* Glow stays on screen forever */}
          <motion.div
            className="absolute inset-[40px] rounded-full bg-cyan-400/10 blur-2xl"
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="absolute inset-[60px] rounded-full border border-cyan-400/20" />
        </div>
      </div>

      {/* 🔽 Bottom Content — pinned above bottom, not stretched */}
      <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center space-y-1 text-center pointer-events-none text-[1.4rem]">
        <AnimatePresence mode="wait">
          {stage >= 4 && (
            <motion.div
              key="heartbeat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-white/60 italic"
            >
              Heartbeat: <span className="text-cyan-300 font-bold">180 bpm</span>
            </motion.div>
          )}
          {stage >= 5 && (
            <motion.div
              key="silence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="text-white/30 italic"
            >
              — Silence —
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}