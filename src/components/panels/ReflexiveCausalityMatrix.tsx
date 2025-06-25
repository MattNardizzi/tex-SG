'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BlankGhostPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full h-full px-6 py-6 rounded-panel bg-black border-2 border-white/10 shadow-panel"
    >
      {/* Empty panel — holds shape and style */}
    </motion.div>
  );
}