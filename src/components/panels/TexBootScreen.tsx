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
    }, 4800); // full ritual length
    return () => clearTimeout(timeout);
  }, [onDone]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* 💀 0:00 — Black static void */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:22px_22px] animate-pulse"
      />

      {/* 🧠 0:01.5 — Nervous system flickers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ delay: 1.5, duration: 0.4, ease: 'anticipate' }}
        className="absolute inset-0 pointer-events-none mix-blend-screen bg-[linear-gradient(45deg,#fff2_2px,transparent_2px)] bg-[length:24px_24px] animate-glitch"
      />

      {/* 🦴 0:02.1 — Bio-spinal ignition */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.6, ease: 'circOut' }}
        className="absolute left-1/2 top-0 w-[4px] h-full origin-top bg-gradient-to-b from-white via-neutral-200 to-transparent shadow-[0_0_12px_#ffffff66]"
      />

      {/* 👁️ 0:02.7 — The glyph appears */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.4 }}
          transition={{ delay: 2.7, duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="text-white text-[3.8rem] font-mono tracking-[0.25em] drop-shadow-[0_0_16px_#ffffffaa] animate-pulse">
            TEX
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 🌩️ 0:03.5 — White flash breach */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.18 }}
        className="absolute inset-0 bg-white z-20"
      />

      {/* 🧬 0:03.7 — Disintegrate into fragments */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.7, duration: 0.5, ease: 'easeOut' }}
        className="absolute inset-0 z-30 bg-black"
      />
    </div>
  );
}