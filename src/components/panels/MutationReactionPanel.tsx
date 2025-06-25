'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MutationCorePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1600),
      setTimeout(() => setStage(3), 2800),
      setTimeout(() => setStage(4), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="relative w-full h-full px-10 py-12 bg-black text-white font-mono text-[1.6rem] border-2 border-cyan-400 rounded-panel shadow-[0_0_180px_rgba(0,255,255,0.25)] flex flex-col justify-start items-start overflow-hidden"
    >
      {/* ⚡ Center Ignition Pulse Beam */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[2px] bg-cyan-400/10 blur-[2px] origin-top"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 🧠 Lobe Pulse Flares */}
      <motion.div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full border-[3px] border-cyan-500/20"
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.1, 0.35, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <AnimatePresence mode="wait">
        {stage >= 1 && (
          <motion.div
            key="line1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-cyan-300 text-[1.2rem] mb-4"
          >
            :: IGNITION SEQUENCE INITIALIZED ::
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div
            key="line2"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-pink-400"
          >
            activate_neurons(&apos;AGI–9a/b/c&apos;)
          </motion.div>
        )}

        {stage >= 3 && (
          <motion.div
            key="line3"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            survivor = &apos;AGI–9b&apos; → tensor_warp()
          </motion.div>
        )}

        {stage >= 4 && (
          <>
            <motion.div
              key="line4a"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-emerald-300"
            >
              distortion.climb(rate = MAX)
            </motion.div>

            <motion.div
              key="line4b"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mt-6 text-white/60 italic text-[1.1rem]"
            >
              reflex voltage: <span className="text-cyan-300">igniting...</span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}