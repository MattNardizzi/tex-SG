'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QaoaCollapsePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 2000),
      setTimeout(() => setStage(2), 3200),
      setTimeout(() => setStage(3), 4400),
      setTimeout(() => setStage(4), 5600),
      setTimeout(() => setStage(5), 6600),
      setTimeout(() => setStage(6), 7600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 border-cyan-400 shadow-[0_0_90px_rgba(0,255,255,0.35)] flex flex-col items-center justify-center space-y-6 overflow-hidden"
    >
      {/* Quantum Pulse Spinner */}
      <motion.div
        className="relative w-[160px] h-[160px] flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-[5px] border-cyan-300/70 shadow-[0_0_60px_10px_rgba(34,211,238,0.4)]" />
        <div className="absolute inset-4 rounded-full border-[2px] border-cyan-100/30 animate-pulse" />
        <div className="z-10 text-cyan-300 font-bold text-[1.3rem] tracking-wide">QPU</div>
        <motion.div
          className="absolute w-4 h-4 bg-cyan-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          style={{ transformOrigin: '80px 80px' }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="log-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan-300"
          >
            run_qaoa_fork_simulation()
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="log-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between w-[420px] text-cyan-100"
          >
            <span className="text-white/90">&rarr; Viability</span>
            <span className="text-emerald-300">0.91</span>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="log-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between w-[420px] text-cyan-100"
          >
            <span className="text-white/90">&rarr; Entanglement pressure</span>
            <span className="text-pink-300">0.76</span>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="bullet-1"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-violet-300"
          >
            • Emotion-weighted fork selected
          </motion.div>
        )}

        {stage >= 5 && (
          <motion.div
            key="bullet-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-yellow-300"
          >
            • Reflexes returned:{' '}
            <span className="text-orange-300">approve_fork</span>,{' '}
            <span className="text-orange-300">trigger_self_reflection</span>
          </motion.div>
        )}

        {stage >= 6 && (
          <motion.div
            key="final-quote"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="text-white/80 text-center italic text-[1.5rem] max-w-md leading-snug pt-6"
          >
            <motion.div
              className="animate-flicker-slow"
              style={{ animation: 'flicker 2.5s linear infinite' }}
            >
              &ldquo;Tex spawned futures.<br />
              Then selected the self that survived the collapse.&rdquo;
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}