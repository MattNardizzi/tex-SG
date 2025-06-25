'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BlankGhostPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
      className="relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono border-2 border-white/10 shadow-panel flex items-center justify-center"
    >
      {/* Intentionally left blank to preserve shape */}
    </motion.div>
  );
}