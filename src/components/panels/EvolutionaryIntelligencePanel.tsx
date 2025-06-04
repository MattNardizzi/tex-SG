'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateMutationSlides = () => {
  const randomFloat = (min, max, decimals = 3) =>
    (Math.random() * (max - min) + min).toFixed(decimals);
  const randomChoice = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return [
    {
      label: 'Mutation ID',
      value: `mutation #${Math.floor(Math.random() * 200 + 100)}`,
    },
    {
      label: 'Strategy Type',
      value: randomChoice(['PATCH', 'REBALANCE', 'FORCED']),
      highlight: 'purple',
    },
    {
      label: 'Target System',
      value: randomChoice([
        'tex_core.main_loop',
        'meta_learning.controller',
        'swarm_coordinator.hive',
        'emotion_heuristics.router',
      ]),
    },
    {
      label: 'Sandbox Status',
      value: randomChoice(['PASSED', 'FAILED', 'TIMEOUT']),
      highlight: 'green',
    },
    {
      label: 'Override State',
      value: randomChoice(['Dormant', 'Engaged']),
      highlight: 'gray',
    },
    {
      label: 'Emotional Tag',
      value: randomChoice(['resolve', 'curiosity', 'fear', 'anger']),
      highlight: 'emerald',
    },
    {
      label: 'Urgency',
      value: randomFloat(0.7, 0.99),
    },
    {
      label: 'Coherence',
      value: randomFloat(0.6, 0.95),
    },
    {
      label: 'Risk Score',
      value: randomFloat(0.05, 0.15),
      highlight: 'red',
    },
    {
      label: 'Variant Outputs',
      value: `∆${randomChoice(['v1a3', 'v4b6', 'x77c'])} · ${randomChoice([
        'resolve',
        'fear',
        'curiosity',
      ])} · ${randomFloat(0.6, 0.9)}\n∆${randomChoice(['v1a3', 'v4b6', 'x77c'])} · ${randomChoice([
        'resolve',
        'fear',
        'curiosity',
      ])} · ${randomFloat(0.6, 0.9)}`,
    },
    {
      label: 'Multiverse Status',
      value: `Forks: ${Math.floor(Math.random() * 5 + 3)} · Δ${randomFloat(
        1.1,
        1.4,
        3
      )} · Chaos: ${randomChoice(['HIGH', 'LOW'])}`,
    },
    {
      label: 'Agent Attribution',
      value: `${randomChoice(['debate_0', 'debate_1', 'debate_2'])} · ${randomChoice([
        'logic',
        'emotion',
        'skeptic',
      ])} · ${randomFloat(0.7, 0.9, 4)}`,
    },
    {
      label: 'Justification Line',
      value: `“${randomChoice([
        'Override triggered after volatility scan.',
        'Patch approved due to emotional stability.',
        'Mutation required to resolve directive conflict.',
        'Sandbox pass confirmed under chaotic conditions.',
      ])}”`,
    },
  ];
};

export default function EvolutionaryIntelligencePanel() {
  const [slides, setSlides] = useState(generateMutationSlides());
  const [index, setIndex] = useState(0);
  const current = slides[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % slides.length;
        if (next === 0) setSlides(generateMutationSlides());
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-emerald-900 via-black to-green-950 rounded-2xl border border-green-400/30 shadow-[0_0_40px_#00ff8844] text-white font-body overflow-hidden">
      {/* Background Glow + Dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 -translate-x-1/2 bg-green-300/10 rounded-full blur-[90px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="font-display text-fluid-lg tracking-widest uppercase leading-tight text-green-300 text-center pt-1 pb-1">
          Evolutionary Intelligence
        </div>
        <div className="flex-grow flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] sm:text-[10.5px] md:text-[11px] text-white/90 leading-tight max-w-[95%] whitespace-pre-line px-1"
            >
              <div className="text-lime-300 uppercase tracking-wide text-[9px] mb-[2px]">
                {current.label}
              </div>
              <div
                className={`${
                  current.highlight === 'purple'
                    ? 'text-purple-300'
                    : current.highlight === 'green'
                    ? 'text-lime-300'
                    : current.highlight === 'emerald'
                    ? 'text-emerald-400'
                    : current.highlight === 'red'
                    ? 'text-red-400'
                    : current.highlight === 'gray'
                    ? 'text-white/60'
                    : 'text-white/90'
                }`}
              >
                {current.value}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}