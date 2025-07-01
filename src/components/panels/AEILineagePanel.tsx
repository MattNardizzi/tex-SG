'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AEILineagePanel() {
  const [stage, setStage] = useState(0);
  const [orchestratorPulse, setOrchestratorPulse] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/aei');

    ws.onmessage = (event) => {
      const msg = event.data;

      // === Orchestrator cue (lighting frame) ===
      if (msg === 'orchestrator:reflex_triggered:run_aei_lineage_with_financial_evolution') {
        setOrchestratorPulse(true);
        setTimeout(() => setOrchestratorPulse(false), 3000);
      }

      // === Reflex-specific state triggers ===
      if (msg === 'aei:start') setStage(1);
      if (msg === 'aei:generate_fork') setStage(1);
      if (msg === 'aei:fork_test_done') setStage(2);
      if (msg === 'aei:market_test_done') setStage(3);
      if (msg === 'aei:fork_survived' || msg === 'aei:fork_rejected') setStage(4);
    };

    return () => ws.close();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative w-full h-full px-6 py-8 rounded-panel bg-black text-white font-mono text-[1.8rem] border-2 ${
        orchestratorPulse ? 'border-yellow-300 shadow-[0_0_80px_rgba(255,255,100,0.4)]' : 'border-lime-400 shadow-[0_0_90px_rgba(0,255,100,0.4)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* 🧬 AEI Lineage Glow Core */}
      <motion.div
        className="z-10 mb-8 w-[160px] h-[160px] bg-black rounded-full border-[3px] border-lime-400 shadow-[0_0_60px_20px_rgba(0,255,100,0.4)]"
        animate={{
          rotate: [0, 6, -5, 3, 0],
          scale: [1, 1.1, 0.97, 1],
          boxShadow: [
            '0 0 60px 20px rgba(0,255,100,0.3)',
            '0 0 90px 30px rgba(0,255,100,0.5)',
            '0 0 30px 10px rgba(0,255,100,0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-6 rounded-full border-[2px] border-white/10"
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex items-center justify-center h-full px-4 text-center">
          <div className="text-lime-300 tracking-widest text-[1.6rem] font-bold leading-none text-center">
            AEI<br />LINEAGE
          </div>
        </div>
      </motion.div>

      {/* 🧠 AEI Reflex Sequence */}
      <div className="z-10 flex flex-col items-center space-y-3 text-[1.4rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lime-300"
            >
              generate_mutated_fork()
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
              test_survival_pressure()
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="line3"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-emerald-300"
            >
              absorb_if_viable()
            </motion.div>
          )}

          {stage >= 4 && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="text-white/70 italic text-center pt-4 text-[1.2rem] leading-snug"
            >
              <span className="animate-pulse">
                “Market volatility triggered evolutionary reflex.
                <br />
                Fittest cognitive lineage encoded with quantum seal.”
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}