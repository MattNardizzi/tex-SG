'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FileRewriteRightPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
      className="absolute top-1/2 right-10 transform -translate-y-1/2 text-right text-white/60 text-lg italic z-20"
    >
      He didn&apos;t learn.
    </motion.div>
  );
}