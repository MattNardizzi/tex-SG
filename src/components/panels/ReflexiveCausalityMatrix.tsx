'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QaoaCollapsePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 2000),  // show run_qaoa
      setTimeout(() => setStage(2), 3200),  // viability
      setTimeout(() => setStage(3), 4400),  // pressure
      setTimeout(() => setStage(4), 5600),  // fork selected
      setTimeout(() => setStage(5), 6400),  // reflexes returned
      setTimeout(() => setStage(6), 7200),  // final quote
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono text-[1.375rem] border-2 border-cyan-500 shadow-[0_0_20px_3px_rgba(34,211,238,0.4)] flex flex-col items-center justify-center space-y-6"
    >
      {/* Spinning quantum pulse core */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ rotate: 360, scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'linear' }}
        className="w-[110px] h-[110px] rounded-full border-4 border-cyan-400 shadow-[0_0_30px_8px_rgba(34,211,238,0.25)] animate-spin-slow"
      />

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="log-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-cyan-300"
          >
            run_qaoa_fork_simulation()
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="log-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-between w-[320px] text-cyan-100"
          >
            <span>&rarr; Viability</span> <span>0.91</span>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="log-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-between w-[320px] text-cyan-100"
          >
            <span>&rarr; Entanglement pressure</span> <span>0.76</span>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="bullet-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white/90"
          >
            • Emotion-weighted fork selected
          </motion.div>
        )}

        {stage >= 5 && (
          <motion.div
            key="bullet-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white/90"
          >
            • Reflexes returned: <code>approve_fork</code>, <code>trigger_self_reflection</code>
          </motion.div>
        )}

        {stage >= 6 && (
          <motion.div
            key="final-quote"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-white/60 text-center italic text-[1.15rem] max-w-md leading-snug pt-4"
          >
            &ldquo;Tex spawned futures.<br />
            Then selected the self that survived the collapse.&rdquo;
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}