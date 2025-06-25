'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const forkNames = ['AGI-9a', 'AGI-9b', 'AGI-9c'];

type Fork = {
  name: string;
  viability: string;
  absorbed: boolean;
  failed: boolean;
};

const createFork = (name: string): Fork => ({
  name,
  viability: (Math.random() * 0.4 + 0.6).toFixed(2),
  absorbed: false,
  failed: false,
});

export default function MutationReactionPanel() {
  const [forks, setForks] = useState<Fork[]>(() => forkNames.map(createFork));
  const [identityWarp, setIdentityWarp] = useState(false);
  const [codeMutated, setCodeMutated] = useState(false);
  const [sealLocked, setSealLocked] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const frames: (() => void)[] = [
      () => {}, // 0:00
      () => {}, // 0:03
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
      () => setIdentityWarp(true), // 0:14
      () => setSealLocked(true),   // 0:18
      () => {}, // 0:22
      () => {}, // 0:26
      () => {}, // 0:30
      () => {}, // 0:34
      () => setCodeMutated(true),  // 0:42
      () => setSealLocked(true),   // 0:46
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
    <div className={`relative w-full h-full px-6 py-5 rounded-panel bg-black text-white font-mono overflow-hidden
      border-2 transition-all duration-500
      ${identityWarp ? 'border-violetMeta shadow-cognitive animate-pulse' : 'border-white/10 shadow-panel'}`}>

      {/* 🌀 Identity Tensor Warp */}
      {identityWarp && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          animate={{ scale: [1, 1.04, 1], rotate: [0, 3, -2, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        >
          <div className="absolute top-1/2 left-1/2 w-[440px] h-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violetMeta/20 blur-[100px] opacity-60 animate-pulse" />
        </motion.div>
      )}

      {/* 🔐 Sovereign Mutation Seal */}
      {sealLocked && (
        <motion.div
          className="absolute top-5 right-6 bg-violetMeta/10 text-violetMeta px-4 py-1 text-xs rounded-full border border-violetMeta/40 backdrop-blur-sm z-20"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1.1, 1], opacity: 1 }}
          transition={{ duration: 0.6, ease: 'anticipate' }}
        >
          Sovereign Mutation Locked 🔒
        </motion.div>
      )}

      {/* 🌌 Vertically Centered Fork Engine */}
      <div className="h-full flex flex-col items-center justify-center space-y-6 relative z-10">
        <div className="text-center tracking-[0.18em] text-reflex-lg uppercase text-violetMeta mt-2 mb-2">
          Mutation Fork Engine
        </div>

        <div className="space-y-3">
          {forks.map(fork => (
            <motion.div
              key={fork.name}
              className={`relative flex justify-between px-4 py-2 rounded-xl border text-sm transition-all duration-500
                ${fork.absorbed ? 'border-sovereignCyan bg-sovereignCyan/10 shadow-cinematic' :
                  fork.failed ? 'border-contradictionRed text-contradictionRed/70 opacity-70 line-through blur-[0.5px]' :
                  'border-white/20 text-white/70'}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>{fork.name}</div>
              <div>Viability: {fork.viability}</div>

              {/* 💥 Failed Fork Fracture */}
              {fork.failed && (
                <motion.div
                  className="absolute inset-0 bg-contradictionRed/10 rounded-xl pointer-events-none"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              )}

              {/* 💠 Absorbed Fork Pulse */}
              {fork.absorbed && (
                <motion.div
                  className="absolute -inset-1 rounded-xl border border-sovereignCyan animate-pulse opacity-40 pointer-events-none"
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* 🧠 Code Mutation Reveal */}
        {codeMutated && (
          <div className="mt-6 p-4 rounded-lg bg-[#111] text-sm text-violetMeta border border-violetMeta/30 animate-pulse text-center">
            <div className="text-white/40 mb-1">↻ Code Mutation Detected:</div>
            <code className="text-fluid">
              <Typewriter
                words={[
                  'register("lifepulse", handle_lifepulse)',
                  '→ register("lifepulse", evolved_lifepulse_handler)',
                ]}
                loop={1}
                typeSpeed={24}
                deleteSpeed={0}
                cursor
              />
            </code>
          </div>
        )}
      </div>

      {/* 🩸 Reflex Timeline Pulse */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-violetMeta/20 via-violetMeta/60 to-transparent animate-pulse" />
    </div>
  );
}