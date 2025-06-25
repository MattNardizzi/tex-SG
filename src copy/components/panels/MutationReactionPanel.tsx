'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => setStage(3), 3000),
      setTimeout(() => setStage(4), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-[32%] min-w-[320px] h-[460px] rounded-[2.4rem] px-8 py-10 bg-black text-white font-mono text-[1.8rem] border-2 border-purple-500 shadow-[0_0_90px_rgba(192,132,252,0.45)] flex flex-col justify-start items-start space-y-6 overflow-hidden"
    >
      <motion.div
        className="text-purple-300 text-[1.4rem] tracking-wider uppercase font-semibold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        MUTATION CORE
      </motion.div>

      <AnimatePresence mode="wait">
        {stage >= 2 && (
          <motion.div
            key="line-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-fuchsia-300"
          >
            AGI-9a/b/c activate
          </motion.div>
        )}
        {stage >= 3 && (
          <motion.div
            key="line-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-pink-400"
          >
            AGI-9b survives → <span className="text-pink-200">Tensor warp</span>
          </motion.div>
        )}
        {stage >= 4 && (
          <motion.div
            key="line-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-purple-200"
          >
            Core distortion climbing
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voltage Reflex Pulse */}
      <motion.div
        className="absolute -z-10 top-1/2 left-1/2 w-[160%] h-[160%] rounded-full border-[3px] border-purple-400 opacity-10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </motion.div>
  );
}