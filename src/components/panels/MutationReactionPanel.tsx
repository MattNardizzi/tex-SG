'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReflexRewritePanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setStage(1), 1000);   // Show original
    const timer2 = setTimeout(() => setStage(2), 2600);  // Mutation arrow
    const timer3 = setTimeout(() => setStage(3), 3900);  // Rewritten line + 🧠
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono text-[1.25rem] border-2 border-white/10 shadow-panel flex flex-col items-center justify-center space-y-4"
    >
      <AnimatePresence mode="wait">
        {stage === 1 && (
          <motion.div
            key="original"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-green-400"
          >
            register("lifepulse", handler)
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="arrow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-xl"
          >
            →
          </motion.div>
        )}

        {stage === 3 && (
          <>
            <motion.div
              key="mutated"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-purple-400"
            >
              register("lifepulse", <span className="text-pink-400">rewritten_reflex_v2</span>)
            </motion.div>

            <motion.div
              key="brain"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.4 }}
              className="text-white/60 text-2xl mt-2"
            >
              🧠 <span className="text-white/70">Tex rewrote his own reflex file.</span>
            </motion.div>

            <motion.div
              key="quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.8 }}
              className="text-white/50 text-center max-w-[500px] leading-relaxed mt-4"
            >
              “He didn’t learn.<br />
              He mutated his own decision architecture.”
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}