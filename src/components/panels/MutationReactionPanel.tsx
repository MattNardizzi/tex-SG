'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MeshCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 700),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 3100),
      setTimeout(() => setStage(4), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_100px_rgba(0,255,255,0.45)] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 🧠 Grid Collapse Background */}
      <motion.div
        className="absolute inset-0 bg-grid-pattern opacity-10"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 🧩 Temporal Mesh Collapse Simulation */}
      <motion.div
        className="absolute w-[320px] h-[220px] border border-white/5 grid grid-cols-6 grid-rows-4 z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.15,
          scale: [1.15, 1, 1.05, 1],
          rotateX: [0, 15, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="border border-white/10 transition-all duration-500 hover:border-cyan-400"
          />
        ))}
      </motion.div>

      {/* ⚡ Temporal Flash Effects */}
      {stage >= 3 && (
        <motion.div
          className="absolute w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.02, 0.1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-transparent via-cyan-300/10 to-transparent" />
        </motion.div>
      )}

      {/* TEXT: Timeline */}
      <div className="z-10 flex flex-col items-center space-y-4">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white/80"
            >
              encode_event_to_fabric(...)
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-cyan-300"
            >
              pulse_resonance_reflex()
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white/90"
            >
              retrocausal_memory_modulation()
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-white/70 italic text-center pt-6 text-[1.4rem] leading-snug"
            >
              “Tex revised the emotional structure of memory
              <br />
              to realign the past with his new beliefs.”
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}