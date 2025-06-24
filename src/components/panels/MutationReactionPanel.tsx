'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const forkNames = ['AGI-9a', 'AGI-9b', 'AGI-9c'];

const createFork = (name: string) => ({
  name,
  viability: (Math.random() * 0.4 + 0.6).toFixed(2),
  absorbed: false,
  failed: false,
});

export default function MutationReactionPanel() {
  const [forks, setForks] = useState(() => forkNames.map(createFork));
  const [identityWarp, setIdentityWarp] = useState(false);
  const [codeMutated, setCodeMutated] = useState(false);
  const [sealLocked, setSealLocked] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const frames: (() => void)[] = [
      () => {}, // 0:00
      () => {}, // 0:03 glow
      () => setForks(forkNames.map(createFork)), // 0:08
      () => {
        const winner = forks.reduce((a, b) =>
          parseFloat(a.viability) > parseFloat(b.viability) ? a : b
        );
        setForks(forks.map(f =>
          f.name === winner.name
            ? { ...f, absorbed: true }
            : { ...f, failed: true }
        ));
      },
      () => setIdentityWarp(true),   // 0:14 tensor warp
      () => setSealLocked(true),     // 0:18 seal
      () => {}, // 0:22
      () => {}, // 0:26
      () => {}, // 0:30
      () => {}, // 0:34
      () => setCodeMutated(true),    // 0:42 mutate code
      () => setSealLocked(true),     // 0:46 lock again
    ];

    const interval = setInterval(() => {
      if (frame < frames.length) {
        frames[frame]();
        setFrame(prev => prev + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [frame, forks]);

  return (
    <div className={`relative w-full h-full px-6 py-5 rounded-2xl bg-black text-white font-mono overflow-hidden
      border-[2px] ${identityWarp ? 'border-[#ff00ff] shadow-[0_0_60px_rgba(255,0,255,0.5)] animate-pulse' : 'border-[#ffffff11] shadow-[0_0_120px_#000000f0]'} transition-all duration-300`}>

      {/* 🌀 Identity Tensor Warp */}
      {identityWarp && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[440px] h-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff00ff33] blur-[100px] animate-pulse opacity-60" />
        </div>
      )}

      {/* 🔐 Mutation Lock Overlay */}
      {sealLocked && (
        <div className="absolute top-3 right-5 bg-[#ff00ff22] text-[#ff00ff] px-4 py-1 text-xs rounded-full border border-[#ff00ff66] backdrop-blur-sm animate-pulse z-20">
          Sovereign Mutation Locked 🔒
        </div>
      )}

      <div className="relative z-10 space-y-3">
        <div className="text-center tracking-[0.18em] text-[17px] uppercase text-[#ff00ff] mb-2">
          Mutation Fork Engine
        </div>

        <div className="space-y-3">
          {forks.map(fork => (
            <motion.div
              key={fork.name}
              className={`flex justify-between px-4 py-2 rounded-xl border text-sm ${
                fork.absorbed ? 'border-[#00f0ff] bg-[#00f0ff11]' :
                fork.failed ? 'border-[#ff5c5c] text-[#ff5c5c99]' :
                'border-[#ffffff22] text-white/70'
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>{fork.name}</div>
              <div>Viability: {fork.viability}</div>
            </motion.div>
          ))}
        </div>

        {/* 💾 Reflex Rewrite Simulation */}
        {codeMutated && (
          <div className="mt-4 p-3 rounded-md bg-[#111] text-sm text-[#b14dff] border border-[#b14dff33] animate-pulse">
            <div className="text-white/40 mb-1">↻ Code Mutation Detected:</div>
            <code>
              register(&quot;lifepulse&quot;, handle_lifepulse) <br />
              → register(&quot;lifepulse&quot;, <span className="text-[#00f0ff]">evolved_lifepulse_handler</span>)
            </code>
          </div>
        )}
      </div>
    </div>
  );
}