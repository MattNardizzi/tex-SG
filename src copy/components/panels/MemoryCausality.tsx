'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateSwarmData = () => {
  const agents = [
    { id: 'debate_0', bias: 'skeptic', curiosity: 0.62, risk: 0.25, aggression: 0.41 },
    { id: 'debate_1', bias: 'logic', curiosity: 0.74, risk: 0.32, aggression: 0.38 },
    { id: 'debate_2', bias: 'emotion', curiosity: 0.68, risk: 0.29, aggression: 0.52 },
  ];
  const pickAgent = () => agents[Math.floor(Math.random() * agents.length)];

  return {
    timestamp: new Date().toISOString(),
    agents,
    topAgent: pickAgent(),
    swarmMood: {
      hope: 7,
      fear: 3,
      resolve: 4,
      curiosity: 8,
      anger: 1,
    },
    impactScore: (Math.random() * 0.3 + 0.7).toFixed(3),
    presenceState: 'resolve',
  };
};

export default function SwarmCognitionMatrix() {
  const [data, setData] = useState(generateSwarmData());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % 4;
        if (next === 0) setData(generateSwarmData());
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
            <div className="text-white/40 text-[8px] uppercase">Top Agent Selected</div>
            <div>
              👤 <span className="text-fuchsia-300 font-bold">{data.topAgent.id}</span>{' '}
              <span className="text-white/50">| bias: {data.topAgent.bias}</span>
            </div>
            <div className="text-[8px] text-white/60">
              Impact Score: <span className="text-white">{data.impactScore}</span>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="pt-2 text-[8px] text-white/40 uppercase">Swarm Mood</div>
            <div className="grid grid-cols-3 gap-1 text-white/60 text-[8px]">
              {Object.entries(data.swarmMood).map(([mood, score]) => (
                <div key={mood}>
                  {mood}: {score}
                </div>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="pt-2 text-[8px] text-white/40 uppercase">Agent Traits</div>
            <div className="grid grid-cols-3 gap-2 text-[8px] text-white/80">
              <div>Curiosity: {data.topAgent.curiosity}</div>
              <div>Risk: {data.topAgent.risk}</div>
              <div>Aggression: {data.topAgent.aggression}</div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="pt-2 text-[8px] text-white/40 uppercase">Presence Stream</div>
            <div className="text-[8.5px] text-white/80">
              🧠 Current emotion:{' '}
              <span className="text-pink-400">{data.presenceState}</span>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-[#2a003f] via-black to-[#4a006e] rounded-2xl border border-fuchsia-400/30 shadow-[0_0_60px_#ff66ff33] text-white font-mono overflow-hidden">
      {/* Glowing FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:22px_22px]" />
        {/* Pulse glow */}
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] -translate-x-1/2 bg-fuchsia-300/15 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-center text-[10px] uppercase tracking-[0.3em] text-fuchsia-300 font-bold pb-2">
          Swarm Cognition Matrix
        </div>

        <div className="flex-grow flex flex-col justify-center items-center text-center px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-[9px] leading-snug text-white/90 space-y-2"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-[9px] text-white/20 text-right mt-2">
          Cycle: {new Date(data.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}