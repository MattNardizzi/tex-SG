'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CausalThreadsPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1400),
      setTimeout(() => setStage(3), 2500),
      setTimeout(() => setStage(4), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 border-pink-400 shadow-[0_0_90px_rgba(255,0,150,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-6"
    >

      {/* 🧠 NEURON-LIKE GRID */}
      <div className="relative w-[300px] h-[240px] z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-[6px] h-[6px] bg-pink-300/70 rounded-full"
            style={{
              top: `${Math.floor(Math.random() * 220)}px`,
              left: `${Math.floor(Math.random() * 280)}px`,
            }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* ⚡ SPARK PULSE */}
        {stage >= 2 && (
          <motion.div
            className="absolute top-[50%] left-[50%] w-[14px] h-[14px] bg-white rounded-full shadow-[0_0_16px_3px_rgba(200,240,255,0.5)]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        )}

        {/* ⚡ GLITCH LINES */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`glitch-${i}`}
            className="absolute h-[1px] w-[120px] bg-pink-300/30"
            style={{
              top: `${Math.floor(Math.random() * 240)}px`,
              left: `${Math.floor(Math.random() * 180)}px`,
              transform: `rotate(${i % 2 === 0 ? 35 : -35}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              x: [0, i % 2 === 0 ? 6 : -6, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* 🧾 DATA LOG OUTPUT */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none leading-snug">
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