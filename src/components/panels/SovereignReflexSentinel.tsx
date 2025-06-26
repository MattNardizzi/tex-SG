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
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono border-2 border-purple-500 shadow-[0_0_100px_rgba(180,100,255,0.45)] overflow-hidden flex flex-col justify-between items-center"
    >

      {/* 🧠 Top Logs */}
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

      {/* 🔷 Compression Grid Core */}
      <div className="relative w-[420px] h-[260px] z-0 pointer-events-none overflow-hidden">
        
        {/* 🧩 Grid Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-purple-600/10 to-fuchsia-500/10 grid grid-cols-6 grid-rows-4 gap-[2px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-full h-full bg-purple-500/5"
              animate={{
                opacity: [0.04, 0.15, 0.04],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3.4 + (i % 5) * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* ⚡ Vertical Beam Pulse */}
        <motion.div
          className="absolute left-1/2 top-0 w-[3px] h-full bg-fuchsia-500/30 blur-[2px]"
          animate={{
            scaleY: [0.9, 1.2, 0.9],
            opacity: [0.05, 0.3, 0.05],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* 🧬 Horizontal Flicker Lines */}
        {[...Array(3)].map((_, idx) => (
          <motion.div
            key={`line-${idx}`}
            className="absolute left-0 right-0 h-[1px] bg-white/10"
            style={{ top: `${30 + idx * 60}px` }}
            animate={{ opacity: [0.04, 0.12, 0.04] }}
            transition={{
              duration: 2 + idx * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* 🌟 One-Time Compression Flash */}
        {stage >= 3 && (
          <motion.div
            className="absolute inset-0 bg-fuchsia-500/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* 🧾 Bottom Diagnostic */}
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