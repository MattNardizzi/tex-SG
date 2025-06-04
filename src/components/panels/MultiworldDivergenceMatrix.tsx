'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateInterventionSlides = () => {
  const randomFloat = (min: number, max: number, decimals: number = 3): number =>
    parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  const randomChoice = (arr: string[]): string =>
    arr[Math.floor(Math.random() * arr.length)];

  return {
    id: crypto.randomUUID(),
    type: randomChoice(['FORCED MUTATION', 'GOAL SUPPRESSION', 'STRATEGY OVERRIDE']),
    cause: randomChoice([
      'cognitive_stall',
      'loop_redundancy',
      'low coherence',
      'bias detected',
      'emotion spike: anger',
    ]),
    patch: randomChoice([
      'tex_core.main_loop',
      'goal_engine.interruptor',
      'meta_learning.regulator',
      'swarm_coordinator.fallback',
    ]),
    result: randomChoice(['Reflex Triggered', 'Autonomous Success', 'Dormant']),
    quote: `"${randomChoice([
      'Override initiated to prevent drift.',
      'Patch required due to conflict escalation.',
      'Mutation passed under high emotional load.',
      'Suppression of misaligned fork successful.',
    ])}"`,
    emotionLevel: randomFloat(0.6, 0.95),
    urgency: randomFloat(0.7, 0.99),
    coherence: randomFloat(0.6, 0.95),
    lastCritical: `${Math.floor(Math.random() * 5)}m ago`,
  };
};

export default function CognitiveInterventionPanel() {
  const [entry, setEntry] = useState(generateInterventionSlides());
  const [stage, setStage] = useState(0);
  const interventionCount = useRef(200);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (stage + 1) % 3;
      if (next === 0) {
        setEntry(generateInterventionSlides());
        interventionCount.current += 1;
      }
      setStage(next);
    }, 3000);
    return () => clearInterval(interval);
  }, [stage]);

  const fade = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#FF365D]/30 via-[#120000] to-black rounded-2xl border border-red-500/20 shadow-2xl text-white font-mono overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 -translate-x-1/2 bg-red-500/10 rounded-full blur-[80px] animate-pulse" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold pb-1">
          Cognitive Intervention
        </div>
        <div className="text-[6.5px] text-white tracking-tight mb-1 whitespace-nowrap">
          Total Interventions: {interventionCount.current} · Last Critical: {entry.lastCritical}
        </div>
      </div>

      {/* STAGES */}
      <div className="relative z-10 h-[135px] flex items-center justify-center px-2 pt-[10px]">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="stage-0"
              {...fade}
              className="grid grid-cols-2 gap-x-6 w-full text-[8px] leading-snug"
            >
              <div>
                <div className="uppercase text-[6.5px] text-white/70">Intervention Type</div>
                <div className="text-purple-300">{entry.type}</div>
                <div className="uppercase text-[6.5px] text-white/70 mt-2">Cause</div>
                <div className="text-red-400">{entry.cause}</div>
              </div>
              <div>
                <div className="uppercase text-[6.5px] text-white/70">Patched Module</div>
                <div className="text-cyan-300">{entry.patch}</div>
                <div className="uppercase text-[6.5px] text-white/70 mt-2">Override Result</div>
                <div className="text-green-400">{entry.result}</div>
              </div>
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="stage-1"
              {...fade}
              className="grid grid-cols-2 gap-x-6 w-full text-[8px] leading-snug"
            >
              <div>
                <div className="uppercase text-[6.5px] text-white/70">Quote</div>
                <div className="text-white italic text-[7px]">{entry.quote}</div>
              </div>
              <div className="space-y-1">
                <div>
                  <div className="uppercase text-[6.5px] text-white/70">Emotion</div>
                  <div className="w-full h-[6px] bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full"
                      style={{ width: `${Math.floor(entry.emotionLevel * 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="uppercase text-[6.5px] text-white/70">Urgency</div>
                  <div className="w-full h-[6px] bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full"
                      style={{ width: `${Math.floor(entry.urgency * 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="uppercase text-[6.5px] text-white/70">Coherence</div>
                  <div className="w-full h-[6px] bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-400 h-full rounded-full"
                      style={{ width: `${Math.floor(entry.coherence * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="stage-2"
              {...fade}
              className="w-full text-center text-[7.5px] text-white italic pt-4"
            >
              Running meta-diagnostic...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}