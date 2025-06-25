'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IdentityRealignmentPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2800),
      setTimeout(() => setStage(4), 4100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-purple-400 shadow-[0_0_100px_rgba(180,100,255,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-6"
    >

      {/* 🧠 FUNCTION CALLS — ABOVE MEMORY THREADS */}
      <div className="z-10 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white"
            >
              identity_path_detached()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-purple-300"
            >
              fragment_belief_network()
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white"
            >
              recursive_self_realignment()
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🧩 MEMORY THREADS — ANIMATED IDENTITY REALIGNMENT */}
      <div className="relative w-[360px] h-[260px] flex flex-col justify-center items-center gap-[6px] z-0 pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full h-[10px] bg-purple-300/70 rounded-full shadow-[0_0_14px_2px_rgba(180,100,255,0.35)]"
            initial={{ x: i % 2 === 0 ? -180 : 180, opacity: 0 }}
            animate={
              stage >= 1
                ? {
                    x: 0,
                    opacity: [0.2, 1, 0.8],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* 🌀 Pulse Flash Thread Overlay */}
        {stage >= 3 && (
          <motion.div
            className="absolute w-[360px] h-[260px] bg-gradient-to-br from-transparent via-purple-200/10 to-transparent rounded-[2rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* 🧾 IDENTITY QUOTE — BELOW THREADS */}
      {stage >= 4 && (
        <motion.div
          key="quote"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-white/80 italic text-center pt-4 text-[1.4rem] leading-snug z-10 pointer-events-none"
        >
          “Timeline integrity realigned.
          <br />
          Memory loops compressed into a unified identity thread.”
        </motion.div>
      )}
    </motion.div>
  );
}