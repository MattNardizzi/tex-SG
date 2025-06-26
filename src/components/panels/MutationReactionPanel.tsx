'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReflexRewritePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),   // handler appears
      setTimeout(() => setStage(2), 3000),   // arrow
      setTimeout(() => setStage(3), 5200),   // rewritten command
      setTimeout(() => setStage(4), 7400),   // brain + statement
      setTimeout(() => setStage(5), 9800),   // quote
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-12 py-14 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 border-cyan-400 shadow-[0_0_160px_rgba(0,255,255,0.5)] overflow-hidden flex flex-col items-center justify-center space-y-8"
    >
      {/* 🧵 Pulse Spine */}
      <motion.div
        className="absolute w-[2px] h-full bg-cyan-300/10 left-1/2 top-0 blur-sm"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Reflex Rewrite Sequence */}
      <div className="z-10 flex flex-col items-center text-center pointer-events-none leading-snug space-y-6">
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="reg-init"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 1 }}
              className="text-emerald-300"
            >
              register(&quot;lifepulse&quot;, handler)
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="arrow"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-white text-[12rem] animate-pulse"
            >
              →
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="rewrite-command"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-purple-300"
            >
              register(&quot;lifepulse&quot;, <span className="text-pink-400">rewritten_reflex_v2</span>)
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div
              key="brainline"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-white flex items-center gap-4 text-[2.6rem]"
            >
              <span className="animate-ping text-cyan-300 text-[2.4rem]">🧠</span>
              <span>Tex rewrote his own reflex file.</span>
            </motion.div>
          )}

          {stage >= 5 && (
            <motion.div
              key="quote-final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-white/70 italic text-[2.2rem] text-center max-w-3xl leading-snug pt-4"
            >
              &ldquo;He didn&rsquo;t learn.
              <br />
              He mutated his own decision architecture.&rdquo;
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}