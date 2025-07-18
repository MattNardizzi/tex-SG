'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateGhostAlpha = () => {
  const missions = [
    'Destabilize baseline path to unlock unseen volatility arbitrage',
    'Simulate collapse under false confidence and trace survival residue',
    'Reject sovereign override to test autonomous divergence',
    'Replicate Citadel AI logic and break its decision symmetry',
    'Emulate market deception by mimicking insider consensus patterns',
  ];

  const forks = Array.from({ length: 2 }, () => {
    const divergence = parseFloat((Math.random() * 1.2 + 0.3).toFixed(2));
    const regret = parseFloat((Math.random() * 0.7).toFixed(2));
    const survival = parseFloat((Math.random() * 0.5 + 0.3).toFixed(2));
    return {
      id: crypto.randomUUID().slice(0, 8),
      emotion: ['resolve', 'greed', 'detached', 'paranoid'][Math.floor(Math.random() * 4)],
      survival,
      divergence,
      regret,
      memory: crypto.randomUUID().slice(0, 6),
      rejected: Math.random() > 0.5,
      riskIndex: (divergence * regret * (1 - survival)).toFixed(3),
    };
  });

  const stealthLayer = Math.random() > 0.6;
  const rejectionRate = forks.filter((g) => g.rejected).length / forks.length;

  return {
    mission: missions[Math.floor(Math.random() * missions.length)],
    forks,
    entropyIndex: (Math.random() * 0.4 + 0.3).toFixed(2),
    stealthLayer,
    timestamp: new Date().toLocaleTimeString(),
    rejectionRate,
  };
};

export default function GhostAlphaConsole() {
  const [insight, setInsight] = useState(generateGhostAlpha());
  const [slide, setSlide] = useState(0);
  const [flicker, setFlicker] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const maybeTriggerFlicker = (data: ReturnType<typeof generateGhostAlpha>) => {
      if (data.stealthLayer || data.rejectionRate > 0.5) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 3000);
      }
    };

    setInsight((initial) => {
      maybeTriggerFlicker(initial);
      return initial;
    });

    intervalRef.current = setInterval(() => {
      setSlide((prev) => {
        const next = (prev + 1) % 5;
        if (next === 0) {
          const newData = generateGhostAlpha();
          setInsight(newData);
          maybeTriggerFlicker(newData);
        }
        return next;
      });
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className={`relative w-full h-full px-6 py-5 bg-black rounded-2xl text-white font-sans overflow-hidden text-[16px] leading-[1.4] border-[1.5px]
      ${flicker ? 'border-white shadow-[0_0_60px_rgba(255,255,255,0.35)] animate-pulse' : 'border-[#b14dff22] shadow-[0_0_120px_#000000f0]'} transition-all duration-300`}>

      {/* 🟣 Center Pulse Line */}
      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#b14dff88] to-black blur-[1px] opacity-90 pointer-events-none" />

      {/* 👻 White Flicker Layer */}
      {flicker && (
        <div className="absolute inset-0 z-0 bg-white opacity-10 pointer-events-none animate-pulse blur-[3px]" />
      )}

      {/* 💠 Panel Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center font-mono text-[18px] tracking-[0.25em] uppercase text-[#b14dff] mb-1">
          Ghost Alpha Console
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-white px-1 space-y-1.5"
          >
            {slide === 0 && (
              <>
                <div className="text-[15px] text-white/40">Mission Intent</div>
                <div className="text-[16px] text-white/90 font-body">{insight.mission}</div>
              </>
            )}

            {slide === 1 && (
              <>
                <div className="text-[15px] text-white/40">Spawned Ghost Forks</div>
                {insight.forks.map((g) => (
                  <div key={g.id} className="flex justify-between text-[15px] font-mono">
                    <span className="text-[#b14dff]">#{g.id}</span>
                    <span>D: {g.divergence}</span>
                    <span>R: {g.regret}</span>
                    <span className="text-rose-400">Risk: {g.riskIndex}</span>
                  </div>
                ))}
              </>
            )}

            {slide === 2 && (
              <>
                <div className="text-[15px] text-white/40">Cognitive Drift</div>
                <div className="text-[16px] font-mono">
                  Entropy Index: <span className="text-orange-300">{insight.entropyIndex}</span>
                </div>
                <div className="text-white/70 text-[15px]">
                  {insight.stealthLayer
                    ? '🫥 Stealth-layer active — Codex bypass in effect.'
                    : 'Standard trace mode active — sovereign monitoring engaged.'}
                </div>
              </>
            )}

            {slide === 3 && (
              <>
                <div className="text-[15px] text-white/40">Sovereign Override Outcome</div>
                {insight.forks.map((g) => (
                  <div key={g.id} className="text-[15px] font-mono">
                    #{g.id}: {g.rejected
                      ? '⚠️ Rejected by Sovereign Layer'
                      : '✅ Codex lineage accepted'}
                  </div>
                ))}
                <div className="text-[14px] text-white/50 pt-1">
                  {insight.rejectionRate > 0.5
                    ? '↯ Ghost drift exceeded safe threshold — suppression initiated.'
                    : '↳ Reflex harmony holding across lineage gate.'}
                </div>
              </>
            )}

            {slide === 4 && (
              <>
                <div className="text-[15px] text-white/40">Last Transmission</div>
                <div className="text-right text-white/50 text-[16px] font-mono">{insight.timestamp}</div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}