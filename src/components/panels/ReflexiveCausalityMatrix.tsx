'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateCausalInsight = () => {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const causes = [
    'Unexpected yield inversion signal',
    'Temporal alignment drift detected',
    'Recursive contradiction from override patch',
    'Agent feedback desync on global fork',
  ];

  const outcomes = [
    'Portfolio realignment induced fork ripple',
    'Strategy gain collapsed under sovereign tension',
    'Forked memory recompiled with altered coherence vector',
    'Simulated future overwritten by counterfactual override',
  ];

  const agentSources = [
    'tex_core',
    'goal_engine',
    'memory_mutator',
    'swarm_coordinator',
    'emotion_heuristics',
    'meta_learning',
  ];

  const path = {
    confidence: (Math.random() * 0.5 + 0.5).toFixed(2),
    contradiction: (Math.random() * 0.6 + 0.2).toFixed(2),
    coherenceDelta: (Math.random() * 0.3 - 0.15).toFixed(3),
    bifurcationScore: (Math.random() * 0.7 + 0.2).toFixed(2),
    entropyPressure: (Math.random() * 0.4 + 0.2).toFixed(2),
    displacement: (Math.random() * 1.2 + 0.3).toFixed(2),
    loopDetected: Math.random() > 0.7,
    overrideChance: (Math.random() * 0.6 + 0.3).toFixed(2),
  };

  const urgencyScore = (
    parseFloat(path.bifurcationScore) + parseFloat(path.entropyPressure)
  ).toFixed(2);

  return {
    cause: pick(causes),
    effect: pick(outcomes),
    path,
    agentSource: pick(agentSources),
    urgencyScore,
    override: Math.random() > 0.6,
    timestamp: new Date().toLocaleTimeString(),
  };
};

export default function ReflexiveCausalityMatrix() {
  const [insight, setInsight] = useState(generateCausalInsight());
  const [slide, setSlide] = useState(0);
  const [rippleActive, setRippleActive] = useState(false);

  useEffect(() => {
    const durations = Array(7).fill(6000);
    let current = 0;
    let timeout: NodeJS.Timeout;

    const triggerRipple = (data: ReturnType<typeof generateCausalInsight>) => {
      if (data.path.loopDetected) {
        setRippleActive(true);
        setTimeout(() => setRippleActive(false), 3000);
      }
    };

    triggerRipple(insight); // fire ripple on initial mount

    const advanceSlide = () => {
      current = (current + 1) % durations.length;
      setSlide(current);
      if (current === 0) {
        const newData = generateCausalInsight();
        setInsight(newData);
        triggerRipple(newData);
      }
      timeout = setTimeout(advanceSlide, durations[current]);
    };

    const insightInterval = setInterval(() => {
      const newData = generateCausalInsight();
      setInsight(newData);
      triggerRipple(newData);
    }, 10000);

    timeout = setTimeout(advanceSlide, durations[0]);
    return () => {
      clearTimeout(timeout);
      clearInterval(insightInterval);
    };
  }, []);

  return (
    <div className={`relative w-full h-full px-6 py-5 rounded-2xl bg-black font-sans overflow-hidden text-[16px] leading-[1.4]
      border-[2px] ${rippleActive ? 'border-[#00f0ff] shadow-[0_0_60px_rgba(0,240,255,0.6)] animate-pulse' : 'border-[#00f0ff22] shadow-[0_0_120px_#000000f0]'} transition-all duration-300`}>
      
      {/* 🔵 Blue Ripple Glow */}
      {rippleActive && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f0ff22] blur-[80px] animate-pulse opacity-50" />
        </div>
      )}

      {/* 🔵 Core Line */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00f0ff88] to-black blur-[1px] opacity-90 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-mono text-[17px] tracking-[0.2em] uppercase text-[#00f0ff] mb-2">
          Reflexive Causality Matrix
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45 }}
            className="px-1 space-y-2 text-[17px]"
          >
            {slide === 0 && (
              <>
                <div className="text-white/60 text-[16px]">Causal Trigger</div>
                <div className="text-[#00f0ff] font-mono">{insight.cause}</div>
              </>
            )}
            {slide === 1 && (
              <>
                <div className="text-white/60 text-[16px]">Projected Effect</div>
                <div className="text-[#b14dff]">{insight.effect}</div>
              </>
            )}
            {slide === 2 && (
              <>
                <div className="text-white/60 text-[16px]">Causal Drift Analysis</div>
                <div className="font-mono">
                  Displacement: <span className="text-[#00f0ff]">{insight.path.displacement}</span>
                </div>
                <div className="text-white/60 text-[16px]">
                  Loop Detected: {insight.path.loopDetected ? '⚠ Recursive Entanglement' : '— Stable path'}
                </div>
              </>
            )}
            {slide === 3 && (
              <>
                <div className="text-white/60 text-[16px]">Override Signal Forecast</div>
                <div className="font-mono">
                  Entropy Pressure: <span className="text-[#b14dff]">{insight.path.entropyPressure}</span>
                </div>
                <div className="text-white/60 text-[16px]">
                  Reflex Probability: <span className="text-[#ff5c5c]">{insight.path.overrideChance}</span>
                </div>
              </>
            )}
            {slide === 4 && (
              <>
                <div className="text-white/60 text-[16px]">Codex Impact + Drift</div>
                <div className="font-mono">
                  Coherence Δ: {insight.path.coherenceDelta} / Bifurcation: {insight.path.bifurcationScore}
                </div>
                <div className="text-white/60 text-[16px]">
                  Sovereign Override: {insight.override ? <span className="text-[#00f0ff]">Activated</span> : '— Dormant'}
                </div>
              </>
            )}
            {slide === 5 && (
              <>
                <div className="text-white/60 text-[16px]">Timestamp</div>
                <div className="text-right text-white/40 text-[15px] font-mono">{insight.timestamp}</div>
              </>
            )}
            {slide === 6 && (
              <>
                <div className="text-white/60 text-[16px]">Agent & Urgency</div>
                <div className="font-mono">
                  Source: <span className="text-[#b14dff]">{insight.agentSource}</span><br />
                  Urgency: <span className="text-[#00f0ff]">{insight.urgencyScore}</span>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}