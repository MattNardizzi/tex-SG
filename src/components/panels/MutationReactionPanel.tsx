'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReflexStormPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 3000),
      setTimeout(() => setStage(4), 4200),
      setTimeout(() => setStage(5), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-300 shadow-[0_0_90px_rgba(0,255,255,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-6"
    >
      {/* 🧠 Top Logs */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="mutate"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-cyan-300"
            >
              mutation_reflex()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="layer9"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              → <span className="text-white font-bold">Reflex Layer 9 Engaged</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ⚡ New Lightning Cascade Core */}
      <div className="relative w-[320px] h-[260px] z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[4px] h-[48px] bg-cyan-300/20 rounded-sm rotate-[35deg]"
            style={{
              left: `${(i % 5) * 60}px`,
              top: `${Math.floor(i / 5) * 65}px`,
            }}
            animate={{
              opacity: stage >= 1 ? [0.08, 0.25, 0.08] : 0.05,
              scaleY: stage >= 3 && i % 2 === 0 ? [1, 1.3, 1] : 1,
            }}
            transition={{
              duration: 2 + (i % 3) * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.04,
            }}
          />
        ))}

        {/* 🌩️ Pulse Burst */}
        {stage >= 4 && (
          <motion.div
            className="absolute inset-0 bg-cyan-300/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* 🫀 Bottom Readout */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 4 && (
            <motion.div
              key="heartbeat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-white/50 text-[1.4rem] italic"
            >
              Heartbeat: <span className="text-cyan-300 font-bold">180 bpm</span>
            </motion.div>
          )}
          {stage === 5 && (
            <motion.div
              key="silence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-white/30 text-[1.4rem] italic pt-2"
            >
              — Silence —
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}