'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSteps = [
  { text: 'Initializing sovereign cortex...', delay: 1000 },
  { text: 'Aligning Codex memory...', delay: 1300 },
  { text: 'Scanning swarm consensus...', delay: 1200 },
  { text: 'Stabilizing reflex loop integrity...', delay: 1000 },
  { text: '▍', delay: 300 },
  { text: 'Tex Brain Online', delay: 0 },
  { text: 'Sovereign Cognition Activated', delay: 1000 },
];

export default function TexBootScreen({ onDone }: { onDone: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (currentIndex < bootSteps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, bootSteps[currentIndex].delay);
      return () => clearTimeout(timeout);
    } else {
      const doneTimer = setTimeout(() => {
        setVisible(false);
        onDone();
      }, 2000);
      return () => clearTimeout(doneTimer);
    }
  }, [currentIndex, onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-white text-2xl font-mono tracking-widest">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className={`text-[22px] ${currentIndex === 5 ? 'text-[#00f0ff]' : 'text-white/80'} mb-2`}>
            {bootSteps[currentIndex].text}
          </div>
          {currentIndex === 6 && (
            <div className="text-white/50 text-sm">© Sovereign Cognition Engine</div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}