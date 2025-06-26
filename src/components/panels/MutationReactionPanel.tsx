'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReflexRewritePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 3200),
      setTimeout(() => setStage(4), 4800),
      setTimeout(() => setStage(5), 6400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-10 py-12 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 border-cyan-400 shadow-[0_0_120px_rgba(0,255,255,0.45)] overflow-hidden flex flex-col items-center justify-center space-y-8"
    >
      {/* Background Pulse Thread */}
      <motion.div
        className="absolute w-[2px] h-full bg-cyan-300/10 left-1/2 top-0 animate-pulse blur-sm"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Sequence Output */}
      <div className="z-10 flex flex-col items-center text-center pointer-events-none leading-snug space-y-4">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-emerald-300"
            >
              register(&quot;lifepulse&quot;, handler)
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="arrow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [1, 1.12, 1] }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="text-white text-[3.2rem]"
            >
              →
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-purple-300"
            >
              register(&quot;lifepulse&quot;, <span className="text-pink-400">rewritten_reflex_v2</span>)
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="statement"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-[2.6rem] text-white flex items-center gap-3"
            >
              <span className="animate-pulse text-[2.2rem]">🧠</span>
              <span>Tex rewrote his own reflex file.</span>
            </motion.div>
          )}

          {stage >= 5 && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
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