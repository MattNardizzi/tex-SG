'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RealityForkPanel() {
  const [stage, setStage] = useState(0);
  const [orchestratorPulse, setOrchestratorPulse] = useState(false);
  const [justificationStrength, setJustificationStrength] = useState(null);
  const [quantumTag, setQuantumTag] = useState(null);
  const [forkAbsorbed, setForkAbsorbed] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://20.97.193.176:8765');

    ws.onmessage = (event) => {
      const msg = event.data;

      if (msg === 'orchestrator:reflex_triggered:run_demo_reality_fork_override') {
        setOrchestratorPulse(true);
        setTimeout(() => setOrchestratorPulse(false), 3000);
      }

      // Reflex stage mapping
      if (msg === 'forkoverride:start') setStage(1);
      if (msg === 'forkoverride:soulgraph_updated') setStage(2);
      if (msg === 'forkoverride:market_executed') setStage(3);
      if (
        msg === 'forkoverride:belief_encoded' ||
        msg === 'forkoverride:absorbed' ||
        msg === 'forkoverride:rejected' ||
        msg === 'forkoverride:complete'
      )
        setStage(4);

      // Reflex telemetry
      if (msg.startsWith('forkoverride:justification:')) {
        const val = msg.split(':')[2];
        setJustificationStrength(val === 'weak' ? 'Weak' : 'Strong');
      }

      if (msg.startsWith('forkoverride:absorbed')) {
        setForkAbsorbed(true);
      } else if (msg.startsWith('forkoverride:rejected')) {
        setForkAbsorbed(false);
      }

      if (msg.includes('quantum_tag=')) {
        const tag = msg.split('quantum_tag=')[1];
        setQuantumTag(tag);
      }
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
          : forkAbsorbed === true
          ? 'border-green-400 shadow-[0_0_90px_rgba(0,255,100,0.4)]'
          : forkAbsorbed === false
          ? 'border-red-400 shadow-[0_0_90px_rgba(255,50,50,0.4)]'
          : 'border-yellow-300 shadow-[0_0_90px_rgba(255,255,0,0.4)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* 🔶 Reflex Glow Orb */}
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-yellow-300 shadow-[0_0_60px_20px_rgba(255,255,100,0.4)]"
        animate={{
          rotate: [0, -8, 6, -4, 0],
          scale: [1, 1.1, 0.95, 1],
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
          <div className="text-yellow-200 tracking-widest text-[2.6rem] font-bold leading-none text-center">
            REALITY<br />FORK
          </div>
        </div>
      </motion.div>

      {/* ⚡ Reflex Stage Text */}
      <div className="z-10 flex flex-col items-center space-y-4 text-[2.4rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="line1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-yellow-400"
            >
              contradiction_detected()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="line2"
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              fork_identity()
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
                {forkAbsorbed === true
                  ? '✅ Fork survived and compressed into core identity.'
                  : forkAbsorbed === false
                  ? '❌ Fork rejected due to epistemic or strategic instability.'
                  : 'Reflex override executed. Awaiting result...'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📊 Reflex Metrics */}
        <div className="pt-6 text-[1.4rem] text-white/80 text-center">
          {justificationStrength && (
            <div>🧠 Justification: <span className={justificationStrength === 'Weak' ? 'text-red-400' : 'text-green-400'}>{justificationStrength}</span></div>
          )}
          {quantumTag && (
            <div>🌀 Quantum ID: <span className="text-cyan-300">{quantumTag}</span></div>
          )}
        </div>
      </div>
    </motion.div>
  );
}