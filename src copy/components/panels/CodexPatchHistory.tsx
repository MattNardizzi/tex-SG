'use client';

import React from 'react';
import { useCodexPatches } from '../hooks/useCodexPatches';

export default function CodexPatchHistory() {
  const patches = useCodexPatches();

  return (
    <div className="relative z-10 w-full max-w-5xl p-6 rounded-3xl border border-fuchsia-500/10 bg-gradient-to-br from-black via-zinc-900/80 to-black shadow-[0_0_36px_rgba(255,0,200,0.2)] hover:shadow-[0_0_64px_rgba(255,0,200,0.35)] backdrop-blur-md transition-all duration-300 space-y-6">
      
      <div className="text-sm uppercase tracking-[0.2em] text-fuchsia-400/90 font-bold">
        📚 Codex Patch History
      </div>

      {patches.length === 0 ? (
        <div className="text-sm text-fuchsia-200 font-mono">
          ⏳ Awaiting patch activity from Tex...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {patches.map((patch, idx) => (
            <div
              key={idx}
              className={`border rounded-xl p-4 space-y-2 backdrop-blur-sm bg-black/60 shadow-inner ${
                patch.result === 'APPLIED'
                  ? 'border-lime-400/20 shadow-lime-400/10'
                  : patch.result === 'REJECTED'
                  ? 'border-rose-500/20 shadow-rose-500/10'
                  : 'border-yellow-400/20 shadow-yellow-400/10'
              } transition-all duration-200`}
            >
              <div className="text-xs text-white/40 tracking-wider">
                ⏱ {patch.timestamp} • 🧠 Module:{' '}
                <span className="text-white/70">{patch.targetModule}</span>
              </div>

              <div className="text-sm font-mono text-white/90">
                🧾 <span className="font-semibold">Patch ID:</span>{' '}
                <span className="text-fuchsia-300">{patch.patchId}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono text-white/80">
                <div>
                  🔮 <span className="font-semibold">Logic Type:</span>{' '}
                  <span className="text-cyan-300 italic">{patch.logicType}</span>
                </div>
                <div>
                  ✅ <span className="font-semibold">Result:</span>{' '}
                  <span
                    className={
                      patch.result === 'APPLIED'
                        ? 'text-lime-400'
                        : patch.result === 'REJECTED'
                        ? 'text-rose-400'
                        : 'text-yellow-400'
                    }
                  >
                    {patch.result}
                  </span>
                </div>
                <div className="col-span-2">
                  💬 <span className="font-semibold">Cause:</span>{' '}
                  <span className="italic text-white/70">{patch.cause}</span>
                </div>
                {patch.errorTag && (
                  <div className="col-span-2 text-sm text-white/70">
                    ⚠️ <span className="font-semibold text-rose-400">Error Tag:</span>{' '}
                    <span className="text-white/60">{patch.errorTag}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="absolute inset-0 rounded-3xl border border-fuchsia-400/5 animate-pulse pointer-events-none" />
    </div>
  );
}