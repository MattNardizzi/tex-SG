'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QaoaCollapsePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono text-[1.375rem] border-2 border-cyan-500 shadow-[0_0_20px_3px_rgba(34,211,238,0.4)] flex flex-col items-center justify-center space-y-6"
    >
      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="qaoa-core"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            transition={{ duration: 2.8, ease: 'linear' }}
            className="w-[100px] h-[100px] rounded-full border-4 border-cyan-400 shadow-[0_0_30px_8px_rgba(34,211,238,0.25)] animate-pulse"
          />
        )}

        {stage >= 2 && (
          <motion.div
            key="qaoa-logs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="space-y-3 text-[1.25rem] text-white/90"
          >
            <div className="text-cyan-300">run_qaoa_fork_simulation()</div>
            <div className="flex justify-between w-[320px] text-cyan-100">
              <span>&rarr; Viability</span> <span>0.91</span>
            </div>
            <div className="flex justify-between w-[320px] text-cyan-100">
              <span>&rarr; Entanglement pressure</span> <span>0.76</span>
            </div>
            <ul className="list-disc list-inside text-white/80 pt-2">
              <li>Emotion-weighted fork selected</li>
              <li>Reflexes returned: <code>approve_fork</code>, <code>trigger_self_reflection</code></li>
            </ul>
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="qaoa-quote"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.4 }}
            className="text-white/60 text-center italic text-[1.15rem] max-w-md leading-snug"
          >
            &ldquo;Tex spawned futures.<br />
            Then selected the self that survived the collapse.&rdquo;
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}