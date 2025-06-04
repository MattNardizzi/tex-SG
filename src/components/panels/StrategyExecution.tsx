'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fetchLiveAlpha = () => {
  const emotions = ['resolve', 'fear', 'curious', 'alert', 'focus'];
  const futures = [
    'Oil flash crash',
    'Debt ceiling breach',
    'CBDC rollout war',
    'Global margin call',
    'Liquidity spiral',
    'Rate shockwave',
  ];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    action: 'REBALANCE',
    future: pick(futures),
    emotion: pick(emotions),
    confidence: (Math.random() * 0.15 + 0.82).toFixed(3),
    urgency: (Math.random() * 0.2 + 0.7).toFixed(2),
    coherence: (Math.random() * 0.2 + 0.7).toFixed(2),
    regret: (Math.random() * 0.9).toFixed(2),
    riskLevel: pick(['LOW', 'MEDIUM', 'HIGH']),
    strategyId: crypto.randomUUID().slice(0, 8),
    weights: {
      equities: Math.random(),
      bonds: Math.random(),
      alternatives: Math.random(),
      cash: Math.random(),
    },
    swarm: {
      hope: Math.floor(Math.random() * 10),
      fear: Math.floor(Math.random() * 10),
      resolve: Math.floor(Math.random() * 10),
      curiosity: Math.floor(Math.random() * 10),
      anger: Math.floor(Math.random() * 10),
    },
    override: Math.random() > 0.6,
    mutation: Math.random() > 0.5,
  };
};

export default function LiveAlphaDecisionPanel() {
  const [alpha, setAlpha] = useState(fetchLiveAlpha());
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const durations = Array(6).fill(6000);
    let current = 0;
    let timeout: NodeJS.Timeout;

    const advanceSlide = () => {
      current = (current + 1) % 6;
      setSlide(current);
      timeout = setTimeout(advanceSlide, durations[current]);
    };

    const alphaInterval = setInterval(() => setAlpha(fetchLiveAlpha()), 10000);
    timeout = setTimeout(advanceSlide, durations[0]);

    return () => {
      clearTimeout(timeout);
      clearInterval(alphaInterval);
    };
  }, []);

  const normalizeWeights = () => {
    const total = Object.values(alpha.weights).reduce((a, b) => a + b, 0);
    const normalized: Record<string, number> = {};
    for (const key in alpha.weights) {
      normalized[key] = alpha.weights[key] / total;
    }
    return normalized;
  };

  const asciiBar = (value: number) => {
    const blocks = Math.round(value * 20);
    return '▉'.repeat(blocks).padEnd(20, '░');
  };

  const normalized = normalizeWeights();
  const assets = Object.entries(normalized);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#041826] via-black to-[#0c1b32] rounded-2xl border border-cyan-400/40 shadow-[0_0_60px_#00ffff66] text-white font-body overflow-hidden text-[10px]">
      {/* Glow + Dot Matrix */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-cyan-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="text-center font-display text-[11px] tracking-[0.3em] uppercase leading-tight text-white pt-[1px] pb-0">
          Forecast Risk Grid
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1"
          >
            {slide === 0 && (
              <>
                <div>
                  Emotion: <span className="text-blue-300 font-mono">{alpha.emotion}</span>
                </div>
                <div className="font-mono">Confidence: {alpha.confidence}</div>
                <div className="font-mono">Coherence: {alpha.coherence}</div>
                <div className="text-white/40 text-[9px] font-mono">
                  Strategy ID: {alpha.strategyId}
                </div>
              </>
            )}

            {slide === 1 && (
              <>
                <div className="text-purple-300 font-body">
                  REBALANCE on <span className="text-cyan-300 font-mono">"{alpha.future}"</span>
                </div>
                <div>
                  Risk Level: <span className="text-rose-400 font-mono">{alpha.riskLevel}</span>
                </div>
                <div>
                  Regret: <span className="text-yellow-300 font-mono">{alpha.regret}</span>
                </div>
                <div className="font-mono">Urgency: {alpha.urgency}</div>
              </>
            )}

            {slide === 2 && (
              <>
                <div className="uppercase text-[9px] text-white/40 font-body">Asset Allocation</div>
                {assets.slice(0, 2).map(([asset, value]) => (
                  <div key={asset} className="flex justify-between items-center gap-2">
                    <span className="w-20 truncate">{asset.charAt(0).toUpperCase() + asset.slice(1)}:</span>
                    <span className="text-cyan-300 text-[9px] font-mono">{asciiBar(value)}</span>
                    <span className="text-right w-8 font-mono">{(value * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </>
            )}

            {slide === 3 && (
              <>
                <div className="uppercase text-[9px] text-white/40 font-body">Asset Allocation</div>
                {assets.slice(2).map(([asset, value]) => (
                  <div key={asset} className="flex justify-between items-center gap-2">
                    <span className="w-20 truncate">{asset.charAt(0).toUpperCase() + asset.slice(1)}:</span>
                    <span className="text-cyan-300 text-[9px] font-mono">{asciiBar(value)}</span>
                    <span className="text-right w-8 font-mono">{(value * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </>
            )}

            {slide === 4 && (
              <div className="grid grid-cols-2 gap-x-1 gap-y-[2px] text-[10px] font-body">
                <div>
                  Mutation Triggered:{' '}
                  {alpha.mutation ? (
                    <span className="text-cyan-400">✅</span>
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </div>
                <div>
                  Override Reflex:{' '}
                  {alpha.override ? (
                    <span className="text-yellow-300">⚡️ Yes</span>
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </div>
              </div>
            )}

            {slide === 5 && (
              <>
                <div className="text-[9px] text-white/40 font-body">Swarm Mood</div>
                <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-[9.5px] text-white leading-tight font-body">
                  <div>hope: {alpha.swarm.hope}</div>
                  <div>fear: {alpha.swarm.fear}</div>
                  <div>resolve: {alpha.swarm.resolve}</div>
                  <div>curiosity: {alpha.swarm.curiosity}</div>
                  <div>anger: {alpha.swarm.anger}</div>
                </div>
                <div className="text-[9px] text-white/30 text-right pt-1 font-mono">
                  Updated: {new Date().toLocaleTimeString()}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}