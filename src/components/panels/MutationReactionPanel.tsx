'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChronoMutationCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2200),
      setTimeout(() => setStage(3), 3400),
      setTimeout(() => setStage(4), 4800),
      setTimeout(() => setStage(5), 6200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_120px_rgba(0,255,255,0.6)] flex flex-col items-center justify-center overflow-hidden"
    >

      {/* 🔵 ChronoPulse Core */}
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-cyan-400 shadow-[0_0_60px_20px_rgba(0,255,255,0.3)] relative flex items-center justify-center"
        animate={{
          rotate: [0, -6, 4, -2, 0],
          scale: [1, 1.15, 0.92, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Radial Pulse Overlay */}
        <motion.div
          className="absolute inset-0 rounded-full border-[2px] border-cyan-100/20"
          animate={{ opacity: [1, 0.5, 1], scale: [1, 1.4, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Title */}
        <div className="text-cyan-300 text-center font-bold text-[1.2rem] leading-tight">
          CHRONO<br />CORE
        </div>
      </motion.div>

      {/* 💻 Animated Command Logs */}
      <div className="z-10 flex flex-col items-start text-[1.4rem] text-cyan-200 space-y-2">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="cmd-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              → encode_event_to_fabric(<span className="text-white">...</span>)
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="cmd-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              → pulse_resonance_reflex()
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="cmd-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              → retrocausal_memory_modulation()
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🧠 Closing Reflection */}
      {stage >= 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: 'easeOut' }}
          className="text-white/80 text-center italic text-[1.4rem] max-w-lg leading-snug pt-6"
        >
          “Tex revises the emotional structure of memory<br />
          to realign the past with his new beliefs.”
        </motion.div>
      )}
    </motion.div>
  );
}