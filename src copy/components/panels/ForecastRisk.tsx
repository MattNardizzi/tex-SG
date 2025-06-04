'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateMutationData = () => {
  const triggers = ['cognitive_stall', 'override_reflex', 'self_patch', 'emotion_bias'];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    timestamp: new Date().toISOString(),
    variantId: `variant_${Math.floor(Math.random() * 100)}`,
    mutationId: `mutation_${crypto.randomUUID().slice(0, 6)}`,
    trigger: pick(triggers),
    coherence: (Math.random() * 0.4 + 0.5).toFixed(3),
    regret: (Math.random() * 0.3 + 0.4).toFixed(3),
    sandboxResult: Math.random() > 0.4 ? 'PASSED' : 'FAILED',
    divergenceScore: (Math.random() * 1.2).toFixed(3),
    chaos: Math.random() > 0.6,
    ghostForked: Math.random() > 0.5,
  };
};

export default function MutationVariantReactor() {
  const [data, setData] = useState(generateMutationData());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % 4;
        if (next === 0) setData(generateMutationData());
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (index) {
      case 0:
        return (
          <>
            <div className="text-white/40 text-[9px] uppercase">Cycle Mutation</div>
            <div>
              🧬 <span className="text-cyan-300 font-bold">{data.mutationId}</span>
            </div>
            <div className="text-[9px] text-white/40">
              Variant Fork: <span className="text-white/80">{data.variantId}</span>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="pt-2 grid grid-cols-2 gap-2 text-[9.5px] text-white/80">
              <div>
                Trigger: <span className="text-orange-300">{data.trigger}</span>
              </div>
              <div>
                Regret Score: <span className="text-yellow-200">{data.regret}</span>
              </div>
              <div>Coherence: {data.coherence}</div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="pt-2 grid grid-cols-2 gap-2 text-[9.5px] text-white/80">
              <div>
                Sandbox: {data.sandboxResult === 'PASSED' ? '✅ Passed' : '❌ Failed'}
              </div>
              <div>Divergence: {data.divergenceScore}</div>
              <div>Chaos: {data.chaos ? '⚠️ Yes' : '—'}</div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="pt-2 text-[9px] text-white/40 uppercase">Ghost Simulation</div>
            <div className="text-[9.5px] text-white/80">
              {data.ghostForked
                ? '👻 Ghost fork spawned in multiverse'
                : '— No ghost fork this cycle'}
            </div>
            <div className="text-[10px] text-white/20 text-right pt-1">
              Cycle: {new Date(data.timestamp).toLocaleTimeString()}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#041826] via-black to-[#0c1b32] rounded-2xl border border-cyan-400/40 shadow-[0_0_60px_#00ffff66] text-white font-mono overflow-hidden">
      {/* Background Glow + Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-cyan-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold pb-2">
        Mutation & Variant Reactor
      </div>

      {/* Slide Content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-center px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] leading-snug text-white/90 space-y-2"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}