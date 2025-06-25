'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FinancialReflexPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: [0, 1, 0.2, 1] }}
      transition={{ duration: 3.6, ease: 'easeInOut', repeat: Infinity }}
      className="relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono border-2 border-white/10 shadow-panel flex items-center justify-center"
    >
      <div className="text-white/60 text-[1.75rem] italic text-center max-w-xs">
        He didn&apos;t learn.
      </div>
    </motion.div>
  );
}