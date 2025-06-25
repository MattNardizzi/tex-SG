'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TexBootScreenProps = {
  onDone: () => void;
};

export default function TexBootScreen({ onDone }: TexBootScreenProps) {
  const pulseRef = useRef<HTMLAudioElement>(null);
  const shockRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Play heartbeat pulse
    pulseRef.current?.play();

    const shock = setTimeout(() => {
      shockRef.current?.play();
    }, 2200);

    const done = setTimeout(() => {
      onDone();
    }, 3600);

    return () => {
      clearTimeout(shock);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <audio ref={pulseRef} src="/sounds/heartbeat.mp3" preload="auto" />
      <audio ref={shockRef} src="/sounds/shockwave.mp3" preload="auto" />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.4 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          className="text-white text-[3.2rem] font-mono tracking-widest"
        >
          TEX
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2.2, duration: 0.2 }}
          className="absolute w-full h-full bg-white"
        />
      </AnimatePresence>
    </div>
  );
}