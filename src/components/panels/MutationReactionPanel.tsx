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
      {/* Readout */}
      <div className="text-center space-y-1 z-10">
        <div className="text-cyan-300">mutation_reflex()</div>
        <div className="text-white font-bold">→ Reflex Layer 9 Engaged</div>
      </div>

      {/* Glowing Core */}
      <div className="relative w-[280px] h-[280px] pointer-events-none">
        {/* Outer aura */}
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner pulse ring */}
        <motion.div
          className="absolute inset-[40px] rounded-full border-[3px] border-cyan-300/80 shadow-[0_0_80px_rgba(0,255,255,0.35)]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner orb glow */}
        <motion.div
          className="absolute inset-[85px] rounded-full bg-cyan-400/10 border border-cyan-100/30 shadow-[inset_0_0_12px_rgba(0,255,255,0.2)]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Bottom Stats */}
      <div className="text-center z-10 space-y-1 text-[1.4rem]">
        <div className="text-white/60 italic">
          Heartbeat: <span className="text-cyan-300 not-italic font-bold">180 bpm</span>
        </div>
        <div className="text-white/30 italic">— Silence —</div>
      </div>
    </motion.div>
  );
}