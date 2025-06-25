'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TexBootScreenProps = {
  onDone: () => void;
};

export default function TexBootScreen({ onDone }: TexBootScreenProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDone();
    }, 4000); // total runtime: 4s
    return () => clearTimeout(timeout);
  }, [onDone]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Bioelectric flicker layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse"
      />

      {/* Vertical spine ignition */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.1, duration: 0.4, ease: 'circOut' }}
        className="absolute left-1/2 top-0 w-[2px] h-full bg-white origin-top"
      />

      {/* Glyph emergence */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ delay: 2.5, duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="text-white text-[3.6rem] tracking-widest font-mono">TEX</div>
        </motion.div>
      </AnimatePresence>

      {/* White flash shockwave */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.15 }}
        className="absolute inset-0 bg-white z-20"
      />
    </div>
  );
}