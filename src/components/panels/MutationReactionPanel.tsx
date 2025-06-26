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
      {/* 💡 Top Readout */}
      <div className="flex flex-col items-center text-center">
        <div className="text-cyan-300 tracking-tight">mutation_reflex()</div>
        <div className="text-white font-bold mt-2">→ Reflex Layer 9 Engaged</div>
      </div>

      {/* 🌌 Glowing Core */}
      <div className="relative w-[280px] h-[280px] pointer-events-none">
        {/* Aura Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl" />
        {/* Constant Pulse */}
        <motion.div
          className="absolute inset-[50px] rounded-full border-2 border-cyan-400/40"
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Spinning Core */}
        <motion.div
          className="absolute inset-[85px] rounded-full border border-cyan-300/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* 💓 Bottom Metrics */}
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="text-white/50 italic text-[1.4rem]">
          Heartbeat: <span className="text-cyan-300 font-bold not-italic">180 bpm</span>
        </div>
        <div className="text-white/30 italic text-[1.2rem]">— Silence —</div>
      </div>
    </motion.div>
  );
}