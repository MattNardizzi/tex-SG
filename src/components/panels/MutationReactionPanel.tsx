'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReflexStormPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 700),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2800),
      setTimeout(() => setStage(4), 4000),
      setTimeout(() => setStage(5), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-300 shadow-[0_0_100px_rgba(0,255,255,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-6"
    >
      {/* 🧠 Top Logs */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="mutate"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-cyan-300"
            >
              mutation_reflex()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="layer9"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white/90"
            >
              → <span className="text-white font-bold">Reflex Layer 9 Engaged</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🌐 Glowing Orb Visual */}
      <div className="relative w-[300px] h-[300px] pointer-events-none">
        {/* Soft glow aura */}
        <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-3xl" />

        {/* Inner pulse ring */}
        <motion.div
          className="absolute inset-[60px] rounded-full border-2 border-cyan-400/30"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ripple ring (on stage) */}
        {stage >= 3 && (
          <motion.div
            className="absolute inset-[30px] rounded-full border-2 border-white/10 blur-md"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.8, opacity: 0.15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )}

        {/* Flash burst */}
        {stage === 4 && (
          <motion.div
            className="absolute inset-0 bg-cyan-300/10 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 1, ease: 'easeOut' }}
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
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
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
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="text-white/30 text-[1.4rem] italic pt-1"
            >
              — Silence —
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}