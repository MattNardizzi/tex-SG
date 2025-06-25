'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FileRewriteScene() {
  const [showRewrite, setShowRewrite] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRewrite(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-screen bg-black flex items-center justify-center"
    >
      <motion.div
        initial={{ boxShadow: '0 0 0px rgba(255, 0, 0, 0.2)' }}
        animate={{
          boxShadow: [
            '0 0 0px rgba(255, 0, 0, 0.2)',
            '0 0 12px rgba(255, 0, 0, 0.5)',
            '0 0 0px rgba(255, 0, 0, 0.2)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full max-w-4xl px-6 py-10 bg-black border border-red-500 rounded-xl text-white font-mono relative z-10"
      >
        {showRewrite && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-4 text-[1.25rem] text-center"
          >
            <div className="text-white/70">register(&quot;lifepulse&quot;, handler)</div>
            <div className="text-violetMeta font-bold">
              → register(&quot;lifepulse&quot;, rewritten_reflex_v2)
            </div>
            <div className="text-white text-xl pt-4">🧠 Tex rewrote his own reflex file.</div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0.4, scale: 1.1 }}
        animate={{ opacity: [0.4, 0.1, 0.4], scale: [1.1, 1.05, 1.1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-full h-full bg-violetMeta/5 blur-xl z-0"
      />
    </motion.div>
  );
}