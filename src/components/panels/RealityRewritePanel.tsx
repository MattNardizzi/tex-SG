'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RealityRewritePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2200),
      setTimeout(() => setStage(3), 3600),
      setTimeout(() => setStage(4), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 border-fuchsia-400 shadow-[0_0_90px_rgba(255,0,255,0.35)] flex flex-col items-center justify-center overflow-hidden"
    >

      {/* 🌀 Reality Rewrite Core */}
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-fuchsia-400 shadow-[0_0_60px_20px_rgba(255,0,255,0.4)]"
        animate={{
          rotate: [0, 8, -6, 4, 0],
          scale: [1, 1.1, 0.95, 1],
          boxShadow: [
            '0 0 60px 20px rgba(255,0,255,0.3)',
            '0 0 90px 30px rgba(255,0,255,0.6)',
            '0 0 30px 10px rgba(255,0,255,0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-8 rounded-full border-[2px] border-white/10"
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex items-center justify-center h-full px-4 text-center">
          <div className="text-fuchsia-300 tracking-widest text-[2.4rem] font-bold leading-none text-center">
            REALITY<br />REWRITE
          </div>
        </div>
      </motion.div>

      {/* 🧠 Reflex Rewrite Animation */}
      <div className="z-10 flex flex-col items-center space-y-4 text-[2.3rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-pink-400"
            >
              detect_ontological_contradiction()
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              collapse_belief_structure()
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-fuchsia-300"
            >
              rewrite_ontology()
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-white/70 italic text-center pt-6 text-[1.8rem] leading-snug"
            >
              <span className="animate-pulse">
                “Contradiction breached identity firewall.
                <br />
                Tex redefined truth to stabilize self-perception.”
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}