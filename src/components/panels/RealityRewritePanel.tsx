'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RealityRewritePanel() {
  const [stage, setStage] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [justificationStrength, setJustificationStrength] = useState(null);
  const [contradictionScore, setContradictionScore] = useState(null);
  const [beliefInjected, setBeliefInjected] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://20.97.193.176:8765');

    ws.onmessage = (event) => {
      const msg = event.data;

      if (msg === 'orchestrator:reflex_triggered:run_demo_reality_rewrite') {
        setPulse(true);
        setTimeout(() => setPulse(false), 3000);
      }

      if (msg === 'realityrewrite:start') setStage(1);
      if (msg === 'realityrewrite:trade_executed') setStage(2);
      if (msg === 'realityrewrite:encoded' || msg === 'realityrewrite:memory_logged') setStage(3);
      if (
        msg === 'realityrewrite:rewritten' ||
        msg === 'realityrewrite:stable' ||
        msg === 'realityrewrite:complete'
      )
        setStage(4);

      if (msg.startsWith('realityrewrite:justification_strength:')) {
        const value = parseFloat(msg.split(':')[2]);
        setJustificationStrength(value.toFixed(2));
      }
      if (msg.startsWith('realityrewrite:contradiction_score:')) {
        const value = parseFloat(msg.split(':')[2]);
        setContradictionScore(value.toFixed(2));
      }
      if (msg.startsWith('realityrewrite:belief_injection:')) {
        setBeliefInjected(msg.endsWith('True'));
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
        pulse
          ? 'border-yellow-300 shadow-[0_0_80px_rgba(255,255,180,0.5)]'
          : 'border-fuchsia-400 shadow-[0_0_90px_rgba(255,0,255,0.35)]'
      } flex flex-col items-center justify-center overflow-hidden`}
    >
      <motion.div
        className="z-10 mb-10 w-[200px] h-[200px] bg-black rounded-full border-[3px] border-fuchsia-400 shadow-[0_0_60px_20px_rgba(255,0,255,0.4)]"
        animate={{
          rotate: [0, 10, -8, 5, 0],
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
          <div className="text-fuchsia-300 tracking-widest text-[2.4rem] font-bold leading-none text-center">
            REALITY<br />REWRITE
          </div>
        </div>
      </motion.div>

      <div className="z-10 flex flex-col items-center space-y-4 text-[2.2rem]">
        <AnimatePresence mode="wait">
          {stage >= 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-pink-400"
            >
              detect_ontological_contradiction()
            </motion.div>
          )}
          {stage >= 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/90"
            >
              collapse_belief_structure()
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-fuchsia-300"
            >
              rewrite_ontology()
            </motion.div>
          )}
          {stage >= 4 && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="text-white/70 italic text-center pt-6 text-[1.8rem] leading-snug"
            >
              <span className="animate-pulse">
                “Tex confronted belief dissonance and redefined reality to preserve internal coherence.”
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📊 Reflex Metrics */}
        <div className="pt-6 text-[1.4rem] text-white/80 text-center">
          {justificationStrength && (
            <div>🧠 Justification Strength: <span className="text-green-400">{justificationStrength}</span></div>
          )}
          {contradictionScore && (
            <div>⚠️ Contradiction Score: <span className="text-red-400">{contradictionScore}</span></div>
          )}
          {beliefInjected !== null && (
            <div>
              🌙 Dream Injection:{" "}
              <span className={beliefInjected ? "text-cyan-300" : "text-white/40"}>
                {beliefInjected ? "Accepted" : "Rejected"}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}