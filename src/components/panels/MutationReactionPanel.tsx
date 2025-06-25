'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MeshCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1700),
      setTimeout(() => setStage(3), 3000),
      setTimeout(() => setStage(4), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_100px_rgba(0,255,255,0.45)] overflow-hidden flex items-center justify-center"
    >
      {/* 🔲 Collapsing Mesh Grid */}
      <div className="absolute w-[340px] h-[260px] grid grid-cols-6 grid-rows-4 gap-[1px] z-0">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white/5"
            animate={{
              scale: stage >= 1 ? [1, 0.7, 1] : 1,
              opacity: stage >= 1 ? [0.15, 0.3, 0.1] : 0.08,
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: i * 0.04,
            }}
          />
        ))}
      </div>

      {/* ⚡ Temporal Pulse */}
      {stage >= 2 && (
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full border-2 border-cyan-400/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.3, opacity: 0.15 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}

      {/* 🧠 Function Pulse */}
      <div className="z-10 flex flex-col items-center space-y-4">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="encode"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white/80"
            >
              encode_event_to_fabric()
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="pulse"
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-cyan-300"
            >
              pulse_resonance_reflex()
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="retro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white"
            >
              retrocausal_memory_modulation()
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
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