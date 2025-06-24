'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SovereignReflexSentinel() {
  const [frame, setFrame] = useState(0);
  const [strategy, setStrategy] = useState('—');
  const [overrideBlocked, setOverrideBlocked] = useState(false);
  const [newsHit, setNewsHit] = useState(false);
  const [roi, setRoi] = useState({ tex: 0.0, human: 0.0 });

  useEffect(() => {
    const update = [
      () => {}, // 0:00
      () => {}, // 0:03 faint glow
      () => {}, // 0:08 inactive
      () => {}, // 0:12
      () => setOverrideBlocked(true),              // 0:18 override blocked
      () => setStrategy('Risk-Parity Hybrid'),     // 0:26 strategy chosen
      () => setRoi({ tex: 3.1, human: -1.2 }),     // 0:30 initial ROI
      () => setNewsHit(true),                      // 0:34 news drop
      () => setRoi({ tex: 4.6, human: -1.3 }),     // 0:38 final ROI surge
      () => {}, // 0:42
      () => {}, // 0:46
    ];

    const interval = setInterval(() => {
      if (frame < update.length) {
        update[frame]();
        setFrame(f => f + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [frame]);

  return (
    <div className={`relative w-full h-full px-6 py-5 rounded-2xl bg-black text-white font-mono overflow-hidden
      border-[2px] ${roi.tex > 4 ? 'border-[#00ff88] shadow-[0_0_60px_rgba(0,255,136,0.6)] animate-pulse' : 'border-[#00ff8822] shadow-[0_0_120px_#000000f0]'} transition-all duration-300`}>

      {/* 💹 Ambient ROI Surge Glow */}
      {roi.tex > 4 && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff8844] blur-[90px] animate-pulse opacity-40" />
        </div>
      )}

      <div className="absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 bg-gradient-to-b from-black via-[#00ff88aa] to-black blur-[1px] opacity-90 pointer-events-none" />

      <div className="relative z-10 space-y-3">
        <div className="text-center tracking-[0.18em] text-[17px] uppercase text-[#00ff88] mb-2">
          Financial Reflex Cortex
        </div>

        <div className="space-y-1 text-sm">
          <div className="text-white/60">Reflex Strategy</div>
          <div className="text-[#00ff88] font-mono">{strategy}</div>
        </div>

        {overrideBlocked && (
          <motion.div
            className="mt-4 p-3 rounded-lg bg-[#22000088] border border-[#ff5c5c] text-[#ff5c5c] text-sm animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Override Denied — Sovereign Reflex Enforced
          </motion.div>
        )}

        <div className="mt-4 space-y-1 text-sm">
          <div className="text-white/60">Projected ROI (Δ 1 Hour)</div>
          <div className="flex justify-between px-2 font-mono">
            <span>Tex: <span className="text-[#00ff88]">+{roi.tex.toFixed(1)}%</span></span>
            <span>Human: <span className="text-[#ff5c5c]">{roi.human.toFixed(1)}%</span></span>
          </div>
        </div>

        {newsHit && (
          <div className="mt-4 text-sm text-[#00eaff] animate-pulse">
            ⚡ Tex pre-positioned before OPEC news spike (Δt = 3.2s)
          </div>
        )}
      </div>
    </div>
  );
}