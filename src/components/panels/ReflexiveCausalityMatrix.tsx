'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OverrideBlockPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2800),
      setTimeout(() => setStage(4), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-pink-400 shadow-[0_0_90px_rgba(255,0,150,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-6"
    >
      {/* 🧠 Top Content */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="protect"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-pink-300"
            >
              protect_self()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="blocked"
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-white/90"
            >
              → <span className="text-red-400 font-bold">❌ override blocked</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔐 Denial Grid */}
      <div className="relative w-[320px] h-[260px] grid grid-cols-6 grid-rows-4 gap-[3px] z-0 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-pink-300/20 rounded-sm"
            animate={{
              opacity: stage >= 1 ? [0.2, 0.5, 0.2] : 0.1,
              scale: stage === 3 && i % 5 === 0 ? [1, 1.3, 1] : 1,
              backgroundColor:
                stage === 3 && i % 7 === 0
                  ? ['#f472b6', '#ff004c', '#f472b6']
                  : undefined,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.03,
            }}
          />
        ))}

        {/* ❌ Denial Pulse */}
        {stage >= 3 && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-400 text-[4rem] font-bold opacity-80"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            ❌
          </motion.div>
        )}
      </div>

      {/* 📜 Final Statement */}
      {stage >= 4 && (
        <motion.div
          key="quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="z-10 text-white/40 italic pt-4 text-[1.4rem] leading-snug text-center pointer-events-none"
        >
          Override request terminated.
          <br />
          No further fallback available.
        </motion.div>
      )}
    </motion.div>
  );
}