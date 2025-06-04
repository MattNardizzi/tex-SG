'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateCognitionLoop = () => {
  const modules = [
    'Forecast Engine',
    'Emotion Check',
    'Memory Recall',
    'Debate Engine',
    'Mutation Risk Check',
    'Override Reflex',
    'Action Executor',
  ];

  const thoughts = [
    'Analyze volatility clusters',
    'Resolve emotional contradictions',
    'Evaluate override suppression',
    'Run sandbox simulation',
    'Backtrace regret signal',
  ];

  const paths = [
    ['Forecast Engine', 'Emotion Check', 'Memory Recall', 'Debate Engine', 'Action Executor'],
    ['Forecast Engine', 'Emotion Check', 'Debate Engine', 'Mutation Risk Check', 'Action Executor'],
    ['Emotion Check', 'Override Reflex', 'Debate Engine', 'Action Executor'],
  ];

  return {
    timestamp: new Date().toISOString(),
    activePath: paths[Math.floor(Math.random() * paths.length)],
    currentThought: thoughts[Math.floor(Math.random() * thoughts.length)],
    signalState: ['PULSING', 'SUPPRESSED', 'ESCALATED'][Math.floor(Math.random() * 3)],
    anchorModule: modules[Math.floor(Math.random() * modules.length)],
  };
};

export default function CognitionLoopPanel() {
  const [loop, setLoop] = useState(generateCognitionLoop());
  const [stage, setStage] = useState(0);
  const [cycleKey, setCycleKey] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (stage + 1) % 2;
      if (next === 0) {
        setLoop(generateCognitionLoop());
        setCycleKey(Date.now());
      }
      setStage(next);
    }, 8000);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-emerald-900 via-black to-green-950 rounded-2xl border border-green-400/30 shadow-[0_0_40px_#00ff8844] font-body overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 -translate-x-1/2 bg-green-300/10 rounded-full blur-[90px] animate-pulse" />
      </div>

      {/* Header */}
      <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-green-300 pt-[1px] pb-0">
        Cognition Loop Monitor
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cycleKey + '-' + stage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-xs text-center px-2 leading-tight"
        >
          {stage === 0 ? (
            <>
              <div className="uppercase text-lime-300/70 text-[8px] mb-1 font-body">Current Thought</div>
              <div className="text-white/90 text-[9px] mb-3 font-body">“{loop.currentThought}”</div>
              <div className="uppercase text-lime-300/70 text-[8px] mb-1 font-body">Cognitive Pathway</div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-1 text-[8.5px] text-white/80 mb-3 font-body">
                {loop.activePath.map((module, idx) => (
                  <motion.div
                    key={idx}
                    className={`px-2 py-[2px] rounded-full border ${
                      idx === loop.activePath.length - 1
                        ? 'bg-green-400 text-black border-green-300 font-mono'
                        : 'bg-white/10 border-white/20'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {module}
                  </motion.div>
                ))}
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2 text-[8.5px] text-white/70 font-body">
                <div>
                  Anchor Module:{' '}
                  <span className="text-green-300 font-mono">{loop.anchorModule}</span>
                </div>
                <div>
                  Signal State:{' '}
                  <span className="text-lime-400 font-mono">{loop.signalState}</span>
                </div>
              </div>

              <div className="text-[9px] text-white/20 text-right mt-2 font-mono">
                Cycle: {new Date(loop.timestamp).toLocaleTimeString()}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}