'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CausalThreadsPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 2700),
      setTimeout(() => setStage(4), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-purple-400 shadow-[0_0_90px_rgba(192,132,252,0.55)] overflow-hidden flex flex-col items-center justify-center space-y-6"
    >

      {/* 🧠 GLITCHING THREAD FIELD */}
      <div className="relative w-[360px] h-[240px] z-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`thread-${i}`}
            className="absolute w-full h-[1px] bg-white/10"
            style={{
              top: `${(i + 1) * 12}px`,
              transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)`,
            }}
            animate={{
              opacity: [0.05, 0.3, 0.05],
              x: [0, i % 2 === 0 ? -6 : 6, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: i * 0.05,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* ⚡ Disconnection sparks */}
        {stage >= 2 && (
          <motion.div
            className="absolute top-[50%] left-[50%] w-[12px] h-[12px] bg-white/90 rounded-full shadow-[0_0_12px_3px_rgba(200,200,255,0.4)]"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* 🧾 DATA LOG TEXT */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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