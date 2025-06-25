'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CausalThreadsPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2800),
      setTimeout(() => setStage(4), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-pink-400 shadow-[0_0_90px_rgba(255,0,150,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-6"
    >

      {/* 🧠 Glitching Thread Grid — Diagonal */}
      <div className="relative w-[360px] h-[260px] z-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`thread-${i}`}
            className="absolute w-[400px] h-[1px] bg-pink-300/40"
            style={{
              top: `${(i + 1) * 12}px`,
              transform: `rotate(${i % 2 === 0 ? 15 : -15}deg)`,
              left: '-20px',
            }}
            animate={{
              opacity: [0.1, 0.3, 0.05],
              x: [0, i % 2 === 0 ? -8 : 8, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: i * 0.05,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* ⚡ Disconnection Spark */}
        {stage >= 2 && (
          <motion.div
            className="absolute top-[50%] left-[50%] w-[14px] h-[14px] bg-white/80 rounded-full shadow-[0_0_16px_3px_rgba(200,240,255,0.5)]"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* 🧾 Text Logs */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white/90"
            >
              Releasing anchor nodes...
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-cyan-300"
            >
              Cause #144 disassociated
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              Belief index realigned
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}