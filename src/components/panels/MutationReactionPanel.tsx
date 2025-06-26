'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ReflexStormPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-300 shadow-[0_0_100px_rgba(0,255,255,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-8"
    >
      {/* Text Block */}
      <div className="text-center space-y-1 z-10">
        <div className="text-cyan-300">mutation_reflex()</div>
        <div className="text-white font-bold">→ Reflex Layer 9 Engaged</div>
      </div>

      {/* Core Visual */}
      <div className="relative w-[260px] h-[260px]">
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-[40px] rounded-full border-2 border-cyan-300/60"
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-[85px] rounded-full border border-cyan-300/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Readout */}
      <div className="text-center z-10 space-y-1 text-[1.4rem]">
        <div className="text-white/60 italic">
          Heartbeat: <span className="text-cyan-300 not-italic font-bold">180 bpm</span>
        </div>
        <div className="text-white/30 italic">— Silence —</div>
      </div>
    </motion.div>
  );
}