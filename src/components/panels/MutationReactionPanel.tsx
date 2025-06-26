'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ReflexStormPanel() {
  const ringSizes = [270, 210, 150, 90]; // 4 rings from largest to smallest

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-300 shadow-[0_0_100px_rgba(0,255,255,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-8"
    >
      {/* Top Readout */}
      <div className="text-center space-y-1 z-10 pointer-events-none">
        <div className="text-cyan-300">mutation_reflex()</div>
        <div className="text-white font-bold">→ Reflex Layer 9 Engaged</div>
      </div>

      {/* Concentric Glowing Circles */}
      <div className="relative w-[300px] h-[300px] pointer-events-none">
        {ringSizes.map((size, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border border-cyan-300/30"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              marginLeft: `-${size / 2}px`,
              marginTop: `-${size / 2}px`,
              boxShadow: `0 0 ${40 - i * 5}px rgba(0,255,255,${0.25 - i * 0.04})`,
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2.6 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Bottom Readout */}
      <div className="text-center z-10 space-y-1 text-[1.4rem] pointer-events-none">
        <div className="text-white/60 italic">
          Heartbeat: <span className="text-cyan-300 not-italic font-bold">180 bpm</span>
        </div>
        <div className="text-white/30 italic">— Silence —</div>
      </div>
    </motion.div>
  );
}