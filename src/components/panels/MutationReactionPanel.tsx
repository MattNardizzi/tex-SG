'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReflexStormPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 3000),
      setTimeout(() => setStage(4), 4200),
      setTimeout(() => setStage(5), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const heartbeat = stage < 5;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-300 shadow-[0_0_90px_rgba(0,255,255,0.45)] overflow-hidden flex flex-col justify-between items-center"
    >
      {/* 🔼 Top Activation Logs */}
      <div className="z-10 pt-4 flex flex-col items-center space-y-2 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="mutate"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-cyan-300"
            >
              mutation_reflex()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="layer9"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white font-semibold"
            >
              → Reflex Layer 9 Engaged
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🌌 Storm Core Visual */}
      <div className="relative w-[360px] h-[360px] z-0 pointer-events-none">
        {/* 💠 Background Aura */}
        <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-3xl" />

        {/* 🧿 Persistent Glow Orb (after stage 3) */}
        {stage >= 3 && (
          <motion.div
            className="absolute inset-[70px] rounded-full bg-cyan-300/10 blur-2xl"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* ◯ Static Outer Ring */}
        <div className="absolute inset-[60px] rounded-full border-[3px] border-cyan-400/15 shadow-[0_0_50px_rgba(0,255,255,0.1)]" />

        {/* ◯ Wireframe Pulse */}
        <motion.div
          className="absolute inset-[40px] rounded-full border border-cyan-400/20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* ⚡ Shock Pulse Animation */}
        {stage >= 1 && stage < 5 && (
          <motion.div
            className="absolute inset-[60px] rounded-full border-[3px] border-cyan-300"
            animate={{
              scale: [1, 1.25, 0.95, 1],
              rotate: [0, -6, 8, -3, 0],
              boxShadow: [
                '0 0 60px 20px rgba(0,255,255,0.3)',
                '0 0 90px 40px rgba(0,255,255,0.6)',
                '0 0 30px 10px rgba(0,255,255,0.4)',
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* 🫀 Heartbeat Flicker Layer */}
        {heartbeat && (
          <motion.div
            className="absolute inset-0 bg-cyan-300/5"
            animate={{ opacity: [0.02, 0.08, 0.02] }}
            transition={{ duration: 0.33, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* 🔽 Bottom Pulse Logs */}
      <div className="z-10 pb-4 flex flex-col items-center space-y-1 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          {stage >= 4 && (
            <motion.div
              key="heartbeat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-white/60 text-[1.4rem] italic"
            >
              Heartbeat: <span className="text-cyan-300 font-bold">180 bpm</span>
            </motion.div>
          )}
          {stage === 5 && (
            <motion.div
              key="silence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="text-white/30 text-[1.4rem] italic"
            >
              — Silence —
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}