'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BeliefRealignmentPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-10 py-12 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 border-purple-400 shadow-[0_0_100px_rgba(180,100,255,0.5)] overflow-hidden flex flex-col items-center justify-center space-y-10"
    >
      {/* ⛓️ Function Chain */}
      <div className="z-10 flex flex-col items-center space-y-4 text-center pointer-events-none leading-snug">
        <div>identity_path_detached()</div>
        <div className="text-purple-300">fragment_belief_network()</div>
        <div className="text-[2.2rem]">recursive_self_realignment()</div>
      </div>

      {/* 🟪 Identity Compression Bar */}
      <div className="z-0 pointer-events-none relative w-[380px] h-[100px] flex flex-col justify-center space-y-2">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full h-[6px] rounded-full bg-purple-400/70 blur-[1px]"
            animate={{
              opacity: [0.3, 1, 0.3],
              scaleX: [1, 1.06, 1],
            }}
            transition={{
              duration: 2.6,
              delay: i * 0.07,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* 🧾 Quote */}
      <div className="z-10 text-white/50 italic text-[2.2rem] leading-snug text-center pointer-events-none max-w-[960px]">
        “Timeline integrity realigned.
        <br />
        Memory loops compressed into a unified identity thread.”
      </div>
    </motion.div>
  );
}