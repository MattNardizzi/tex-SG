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
      setTimeout(() => setStage(4), 4600),
      setTimeout(() => setStage(5), 6400),
      setTimeout(() => setStage(6), 7200),
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
      {/* Neon Data Line */}
      <motion.div
        className="absolute w-[2px] h-full bg-cyan-300/10 left-1/2 top-0 blur-sm"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="z-10 flex flex-col items-center text-center pointer-events-none leading-snug space-y-6">
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="handler-init"
              initial={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.8 }}
              className="text-emerald-300 drop-shadow-lg"
            >
              register(&quot;lifepulse&quot;, handler)
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="arrow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [1, 1.2, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-[4rem] animate-pulse"
            >
              →
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="rewrite-command"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-purple-300"
            >
              register(&quot;lifepulse&quot;, <span className="text-pink-400">rewritten_reflex_v2</span>)
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div
              key="brainline"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: [1, 1.04, 1] }}
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