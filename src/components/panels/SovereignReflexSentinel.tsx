'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IdentityCompressionPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 700),
      setTimeout(() => setStage(2), 1700),
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
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-purple-500 shadow-[0_0_100px_rgba(180,100,255,0.45)] overflow-hidden flex flex-col justify-between items-center space-y-6"
    >
      {/* 🔼 Top Diagnostic Logs */}
      <div className="z-20 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="init"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-fuchsia-400"
            >
              init_compression_protocol()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="delta"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-white"
            >
              Δidentity = <span className="text-indigo-300 font-bold">−0.43</span>
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div
              key="vector"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-emerald-400"
            >
              vector_self_realign()
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🧠 Visual Collapse Core */}
      <div className="relative w-[360px] h-[360px] z-0 pointer-events-none">
        {/* 🌌 Blurred Inner Mesh Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/10 via-indigo-400/10 to-fuchsia-400/10 blur-2xl" />

        {/* 🔘 Static Contour Layer */}
        <div className="absolute inset-[60px] rounded-full border border-purple-500/30 shadow-[0_0_60px_rgba(180,100,255,0.2)]" />

        {/* 🌀 Rotating Grid Distortion */}
        <motion.div
          className="absolute inset-[40px] rounded-full border border-purple-400/25"
          animate={{
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* 🌪 Identity Vortex */}
        {stage >= 2 && (
          <motion.div
            className="absolute inset-[50px] rounded-full border-2 border-fuchsia-400 blur-sm"
            initial={{ scale: 1, rotate: 0 }}
            animate={{
              scale: [1, 0.85, 0.65],
              rotate: 540,
              opacity: [0.4, 0.1, 0],
            }}
            transition={{
              duration: 3.2,
              ease: 'easeOut',
            }}
          />
        )}

        {/* 🌠 Radial Flicker Grid */}
        <motion.div
          className="absolute inset-[28px] rounded-full border border-white/10"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* 🔽 Bottom Collapse Completion */}
      <div className="z-20 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage === 4 && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="text-white/40 italic text-[1.4rem] pt-2"
            >
              Core identity stabilized.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}