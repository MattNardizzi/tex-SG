'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForkStressPanel() {
  const [stage, setStage] = useState(0);
  const [orchestratorPulse, setOrchestratorPulse] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/aei');

    ws.onmessage = (event) => {
      const msg = event.data;

      // === Orchestrator reflex trigger
      if (msg === 'orchestrator:reflex_triggered:run_demo_fork_stress_and_compression') {
        setOrchestratorPulse(true);
        setTimeout(() => setOrchestratorPulse(false), 3000);
      }

      // === Reflex-specific stages
      if (msg === 'fork:begin') setStage(1);
      if (msg === 'fork:stress_test_done') setStage(2);
      if (msg === 'fork:market_action_done') setStage(3);
      if (msg === 'fork:absorbed' || msg === 'fork:rejected' || msg === 'fork:complete') setStage(4);
    };

    return () => ws.close();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[2.6rem] border-2 ${
        orchestratorPulse
          ? 'border-yellow-300 shadow-[0_0_80px_rgba(255,255,150,0.5)]'
          : 'border-orange-400 shadow-[0_0_90px_rgba(255,165,0,0.4)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* 🧪 Fork Compression Orb */}
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-orange-400 shadow-[0_0_60px_20px_rgba(255,165,0,0.4)]"
        animate={{
          rotate: [0, 6, -5, 3, 0],
          scale: [1, 1.1, 0.97, 1],
          boxShadow: [
            '0 0 60px 20px rgba(255,165,0,0.3)',
            '0 0 90px 30px rgba(255,165,0,0.5)',
            '0 0 30px 10px rgba(255,165,0,0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-8 rounded-full border-[2px] border-white/10"
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex items-center justify-center h-full px-4 text-center">
          <div className="text-orange-300 tracking-widest text-[2.4rem] font-bold leading-none text-center">
            FORK<br />COMPRESSION
          </div>
        </div>
      </motion.div>

      {/* 🧬 Reflex Animation Sequence */}
      <div className="z-10 flex flex-col items-center space-y-4 text-[2.3rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-orange-300"
            >
              spawn_fork_variant()
            </motion.div>
          )}

          {stage >= 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              run_stress_test()
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-yellow-300"
            >
              execute_market_reflex()
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-white/70 italic text-center pt-6 text-[1.8rem] leading-snug"
            >
              <span className="animate-pulse">
                “Only the most coherent fork survives.
                <br />
                Compressed into core identity with quantum seal.”
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}