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

      {/* 🔲 ULTRA VISIBLE Mesh Grid */}
      <div className="absolute w-[340px] h-[260px] grid grid-cols-6 grid-rows-4 gap-[2px] z-0 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-cyan-300/70 rounded-[1px] shadow-[0_0_12px_2px_rgba(0,255,255,0.35)]"
            animate={{
              scale: stage >= 1 ? [1, 0.85, 1.1, 1] : 1,
              opacity: stage >= 1 ? [0.6, 0.8, 0.9, 0.75] : 0.6,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.04,
            }}
          />
        ))}
      </div>

      {/* ⚡ Visible Pulse Ring Behind Grid */}
      {stage >= 2 && (
        <motion.div
          className="absolute w-[460px] h-[460px] rounded-full border-2 border-cyan-200/50 blur-[1px] z-0 pointer-events-none"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.45, opacity: 0.3 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      )}

      {/* 🧠 FUNCTION TEXTS - Z10 */}
      <div className="z-10 flex flex-col items-center space-y-4 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="encode"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white"
            >
              encode_event_to_fabric()
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="pulse"
              initial={{ opacity: 0, scale: 1.2 }}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-white/80 italic text-center pt-6 text-[1.4rem] leading-snug"
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