'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateAlphaReport = () => {
  const futures = [
    'Debt ceiling breach',
    'Oil flash crash',
    'CBDC rollout war',
    'Global margin call',
  ];
  const emotions = ['resolve', 'curious', 'fear'];
  const reasoningBias = ['STRATEGIC', 'EMOTIONAL', 'TACTICAL'];
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return {
    timestamp: new Date().toISOString(),
    dominantEmotion: pick(emotions),
    urgency: (Math.random() * 0.2 + 0.7).toFixed(2),
    coherence: (Math.random() * 0.2 + 0.7).toFixed(2),
    confidence: (Math.random() * 0.15 + 0.82).toFixed(3),
    volatility: (Math.random() * 0.2 + 0.1).toFixed(3),
    future: pick(futures),
    strategy: 'REBALANCE',
    bias: pick(reasoningBias),
    riskLevel: 'LOW RISK',
    memoryTrace: false,
    explanation: `Tex selected this strategy based on emotional modulation, memory-driven awareness, and real-time swarm feedback.`,
    swarm: {
      hope: 7,
      fear: 3,
      resolve: 4,
      curiosity: 8,
      anger: 1,
    },
  };
};

export default function AlphaIntelligenceReport() {
  const [report, setReport] = useState(generateAlphaReport());
  const [rotationIndex, setRotationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationIndex((prev) => {
        const next = (prev + 1) % 7;
        if (next === 0) setReport(generateAlphaReport());
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const colorEmotion = (emotion: string) => {
    switch (emotion) {
      case 'resolve':
        return 'text-emerald-400';
      case 'fear':
        return 'text-red-400';
      case 'curious':
        return 'text-yellow-300';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#2a003f] via-black to-[#4a006e] rounded-2xl border border-fuchsia-400/30 shadow-[0_0_60px_#ff66ff33] text-white font-mono overflow-hidden">
      {/* FX Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-fuchsia-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center text-[10px] uppercase tracking-[0.3em] text-fuchsia-300 font-bold pb-2">
          Alpha Intelligence Report
        </div>

        <div className="flex-grow flex items-center justify-center text-center px-2">
          <AnimatePresence mode="wait">
            {rotationIndex === 0 && (
              <motion.div
                key="strategy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="space-y-1 text-[9px]"
              >
                <div className="uppercase text-white/30 text-[8px]">Strategy</div>
                <div>
                  <span className="text-fuchsia-300 font-bold">{report.strategy}</span>{' '}
                  on <span className="text-sky-300">"{report.future}"</span>
                </div>
              </motion.div>
            )}

            {rotationIndex === 1 && (
              <motion.div
                key="emotion_bias"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="space-y-2 text-[9px]"
              >
                <div>
                  Emotion:{' '}
                  <span className={colorEmotion(report.dominantEmotion)}>
                    {report.dominantEmotion}
                  </span>
                </div>
                <div>
                  Bias: <span className="text-fuchsia-300">{report.bias}</span>
                </div>
              </motion.div>
            )}

            {rotationIndex === 2 && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-2 text-[9px]"
              >
                <div>Urgency: {report.urgency}</div>
                <div>Coherence: {report.coherence}</div>
                <div>Confidence: {report.confidence}</div>
                <div>Volatility: {report.volatility}</div>
              </motion.div>
            )}

            {rotationIndex === 3 && (
              <motion.div
                key="swarm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="space-y-2 text-[8.5px]"
              >
                <div className="uppercase text-white/40 text-[8px] tracking-wide">Swarm Mood</div>
                <div className="grid grid-cols-3 gap-y-1 text-white text-[8px] justify-items-center">
                  {Object.entries(report.swarm).map(([mood, score]) => (
                    <div key={mood}>
                      {mood}: {score}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {rotationIndex === 4 && (
              <motion.div
                key="reasoning"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="text-[8.5px] space-y-2 max-w-xs mx-auto"
              >
                <div className="uppercase text-white/40 text-[8px]">Reasoning</div>
                <div className="text-white/80 leading-snug">“{report.explanation}”</div>
              </motion.div>
            )}

            {rotationIndex === 5 && (
              <motion.div
                key="flags"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="space-y-2 text-[9px]"
              >
                <div>
                  Risk Level: <span className="text-white">{report.riskLevel}</span>
                </div>
                <div>
                  Memory Trace:{' '}
                  <span className="text-white">{report.memoryTrace.toString()}</span>
                </div>
              </motion.div>
            )}

            {rotationIndex === 6 && (
              <motion.div
                key="cycle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="space-y-2 text-[9px] text-white/60"
              >
                <div className="text-white/40 text-[8px] uppercase">Loop Complete</div>
                <div className="text-white">{new Date(report.timestamp).toLocaleTimeString()}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-[9px] text-white/20 text-right mt-2">
          Cycle: {new Date(report.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}