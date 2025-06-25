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
      () => {},
      () => {},
      () => setForks(forkNames.map(createFork)),
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
      () => setIdentityWarp(true),
      () => setSealLocked(true),
      () => {},
      () => {},
      () => {},
      () => {},
      () => setCodeMutated(true),
      () => setSealLocked(true),
    ];

    const interval = setInterval(() => {
      if (frame < frames.length) {
        frames[frame]();
        setFrame(prev => prev + 1);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [frame, forks]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      className={`relative w-full h-full px-6 py-6 rounded-panel bg-black text-white font-mono overflow-hidden
      border-2 transition-all duration-500
      ${identityWarp ? 'border-violetMeta shadow-cognitive' : 'border-white/10 shadow-panel'}`}
    >
      {sealLocked && (
        <motion.div
          className="absolute top-5 right-6 bg-violetMeta/10 text-violetMeta px-5 py-2 text-sm rounded-full border border-violetMeta/40 backdrop-blur-sm z-20 font-semibold tracking-wide"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [1.1, 1], opacity: 1 }}
          transition={{ duration: 0.6, ease: 'anticipate' }}
        >
          Sovereign Mutation Locked 🔒
        </motion.div>
      )}

      <div className="h-full flex flex-col items-center justify-center space-y-8 relative z-10 w-full max-w-[640px] mx-auto">
        <div className="text-center tracking-[0.18em] text-reflex-lg uppercase text-violetMeta mt-2 mb-2">
          Mutation Fork Engine
        </div>

        <div className="flex flex-col gap-5 w-full">
          {forks.map(fork => (
            <motion.div
              key={fork.name}
              className={`relative w-full flex justify-between items-center px-10 py-5 rounded-xl border text-[1.25rem] leading-relaxed tracking-wide font-mono transition-all duration-500
                ${fork.absorbed ? 'border-sovereignCyan bg-sovereignCyan/10 shadow-cinematic' :
                  fork.failed ? 'border-contradictionRed text-contradictionRed/70 opacity-70 line-through blur-[0.5px]' :
                  'border-white/20 text-white/70'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>{fork.name}</div>
              <div>Viability: {fork.viability}</div>
              {fork.failed && (
                <motion.div
                  className="absolute inset-0 bg-contradictionRed/10 rounded-xl pointer-events-none"
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {codeMutated && (
          <div className="mt-8 w-full p-5 rounded-lg bg-[#111] text-lg text-violetMeta border border-violetMeta/30 text-center">
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

      <div className="absolute top-0 left-1/2 w-[2px] h-full bg-violetMeta blur-sm z-0" />
    </motion.div>
  );
}
