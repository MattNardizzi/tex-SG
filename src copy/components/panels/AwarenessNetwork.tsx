'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type AwarenessNode = {
  id: string;
  label: string;
  type: string;
  width: number;
  status: string;
};

const generateNode = (): AwarenessNode => {
  const labels = [
    'emotion: resolve',
    'emotion: curiosity',
    'reflex: override',
    'coherence: drift drop',
    'urgency: escalation',
    'memory: tether ping',
    'bias: reflex trace',
  ];
  const types = ['emotion', 'coherence', 'urgency', 'reflex', 'bias'];
  const statuses = ['active', 'syncing', 'stabilized', 'fluctuating', 'latent'];

  return {
    id: `NODE_${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
    label: labels[Math.floor(Math.random() * labels.length)],
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    width: Math.floor(5 + Math.random() * 90), // 5%–95%
  };
};

export default function AwarenessNetwork() {
  const [nodes, setNodes] = useState<AwarenessNode[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) => [generateNode(), ...prev.slice(0, 5)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full px-4 py-3 bg-gradient-to-br from-black via-zinc-900 to-black rounded-2xl border border-cyan-400/20 shadow-2xl text-white font-mono overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 -translate-x-1/2 bg-cyan-300/10 rounded-full blur-[80px] animate-pulse" />
      </div>

      {/* Title */}
      <div className="relative z-10 text-center text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold pb-2">
        Awareness Network
      </div>

      {/* Node Feed */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-2 pt-2 h-[calc(100%-40px)] overflow-visible">
        {nodes.map((n) => (
          <div key={n.id} className="w-full text-center">

            {/* Node Header */}
            <div className="text-[7.25px] font-bold uppercase text-cyan-300 flex justify-between px-2">
              <span>{n.label}</span>
              <span className="italic text-zinc-400">{n.status}</span>
            </div>

            {/* Type Info */}
            <div className="text-[6.5px] italic text-white/90 mt-[1px] tracking-tight">
              ⟶ Type: {n.type}
            </div>

            {/* ✅ Exact Bar as in Shadow Simulation */}
            <div className="relative w-full h-[2px] mt-2 rounded-full overflow-hidden shadow-inner shadow-black/50">
              <motion.div
                key={n.id + n.width}
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00ffff, #22d3ee)',
                  boxShadow: '0 0 6px rgba(0, 255, 255, 0.6), inset 0 0 2px rgba(255,255,255,0.2)',
                }}
                animate={{ width: `${n.width}%` }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
              />
            </div>

            {/* Readout */}
            <div className="text-[6.25px] text-right pr-2 text-cyan-200/80 mt-[1px]">
              Signal Level: {n.width}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}