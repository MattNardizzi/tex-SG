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
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-purple-500 shadow-[0_0_100px_rgba(180,100,255,0.45)] overflow-hidden flex flex-col justify-between items-center"
    >
      {/* 🔼 Top Logs */}
      <div className="z-10 pt-4 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="init"
              initial={{ opacity: 0, y: -8 }}
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

      {/* 🧠 Compression Core */}
      <div className="relative w-[360px] h-[360px] z-0 pointer-events-none">
        {/* ✴️ Inner Persistent Glow */}
        <motion.div
          className="absolute inset-[70px] rounded-full bg-fuchsia-500/10 blur-2xl"
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* 🌀 Rotating Contour Grid */}
        <motion.div
          className="absolute inset-[40px] rounded-full border border-purple-400/25"
          animate={{
            rotate: [0, 360],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* 🌪️ One-Time Identity Vortex */}
        {stage >= 2 && (
          <motion.div
            className="absolute inset-[50px] rounded-full border-2 border-fuchsia-400 blur-sm"
            initial={{ scale: 1, rotate: 0 }}
            animate={{
              scale: [1, 0.8, 0.6],
              rotate: 540,
              opacity: [0.4, 0.1, 0],
            }}
            transition={{
              duration: 3,
              ease: 'easeOut',
            }}
          />
        )}

        {/* ⚪ Static Inner Contour */}
        <div className="absolute inset-[60px] rounded-full border border-purple-500/30 shadow-[0_0_60px_rgba(180,100,255,0.2)]" />

        {/* ✳ Flickering Field */}
        <motion.div
          className="absolute inset-[30px] rounded-full border border-white/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.04, 0.1, 0.04],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* 🔽 Bottom Diagnostic Text */}
      <div className="z-10 pb-4 flex flex-col items-center space-y-1 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage === 4 && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="text-white/40 italic text-[1.4rem]"
            >
              Core identity stabilized.
            </motion.div>
          )} 
        </AnimatePresence>
      </div>
    </motion.div>
  );
}