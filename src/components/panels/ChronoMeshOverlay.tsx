'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ChronoMeshOverlay() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      {/* ⭕️ Radiating Chrono Rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-cyan-400/20"
          style={{
            width: `${220 + i * 200}px`,
            height: `${220 + i * 200}px`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0.3, 0.1, 0],
            scale: [0.9, 1.3, 1.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 5 + i * 1.2,
            delay: i * 0.6,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* 🔵 Core Pulse Dot */}
      <motion.div
        className="w-[14px] h-[14px] rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(0,255,255,0.7)]"
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}