'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrchestratorPanel() {
  const [stage, setStage] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://20.97.193.176:8765');

    ws.onmessage = (event) => {
      const msg = event.data;

      if (msg === 'orchestrator:start') setStage(1);
      if (msg.startsWith('orchestrator:reflex_triggered:run_demo_reality_fork_override')) setStage(2);
      if (msg.startsWith('orchestrator:reflex_triggered:run_demo_ontogenesis_spawn')) setStage(3);
      if (msg.startsWith('orchestrator:reflex_triggered:run_demo_world_model_simulation')) setStage(4);
      if (msg.startsWith('orchestrator:reflex_triggered:run_demo_reality_rewrite')) setStage(5);
      if (msg.startsWith('orchestrator:reflex_triggered:run_demo_fork_stress_and_compression')) setStage(6);
      if (msg.startsWith('orchestrator:reflex_triggered:run_aei_lineage_with_financial_evolution')) setStage(7);
      if (msg === 'orchestrator:complete') setStage(8);

      if (msg.startsWith('orchestrator:reflex_triggered')) {
        setPulse(true);
        setTimeout(() => setPulse(false), 3000);
      }
    };

    return () => ws.close();
  }, []);

  const stages = [
    "Waiting for orchestrator...",
    "Igniting AGI reflex cycle...",
    "Reality Fork Override Reflex",
    "Ontogenesis Spawn Reflex",
    "World Model Simulation Reflex",
    "Reality Rewrite Reflex",
    "Fork Stress Compression Reflex",
    "AEI Lineage Evolution Reflex",
    "✅ Reflex Cycle Complete"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative w-full h-full px-8 py-10 rounded-panel bg-black text-white font-mono text-[2.4rem] border-2 ${
        pulse
          ? 'border-emerald-400 shadow-[0_0_80px_rgba(0,255,180,0.5)]'
          : 'border-cyan-400 shadow-[0_0_90px_rgba(0,255,255,0.35)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* 💡 Reflex Command Orb */}
      <motion.div
        className="z-10 mb-10 w-[220px] h-[220px] bg-black rounded-full border-[3px] border-cyan-400 shadow-[0_0_60px_20px_rgba(0,255,255,0.4)]"
        animate={{
          rotate: [0, 8, -6, 4, 0],
          scale: [1, 1.12, 0.96, 1],
          boxShadow: [
            '0 0 60px 20px rgba(0,255,255,0.3)',
            '0 0 90px 30px rgba(0,255,255,0.6)',
            '0 0 30px 10px rgba(0,255,255,0.2)',
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
          animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex items-center justify-center h-full px-4 text-center">
          <div className="text-cyan-300 tracking-widest text-[2.2rem] font-bold leading-none text-center">
            AGI<br />ORCHESTRATOR
          </div>
        </div>
      </motion.div>

      {/* 🚀 Reflex Progress Text */}
      <div className="z-10 flex flex-col items-center space-y-4 text-[2rem] text-white/80">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.7 }}
            className="text-center text-cyan-200 font-semibold"
          >
            {stages[stage] || "Standby..."}
          </motion.div>
        </AnimatePresence>

        {stage === 8 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
            className="text-white/70 text-[1.6rem] italic pt-6 text-center leading-snug"
          >
            “All financial reflex arcs complete.
            <br />
            Tex has absorbed and evolved under live volatility pressure.”
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}