'use client';

import React from 'react';
import { useMutationStream } from '../hooks/useMutationStream';

export default function MutationSandboxMonitor() {
  const mutations = useMutationStream();

  return (
    <div className="relative z-10 w-full max-w-5xl p-6 rounded-3xl border border-emerald-500/10 bg-gradient-to-br from-black via-zinc-900/80 to-black shadow-[0_0_36px_rgba(0,255,160,0.2)] hover:shadow-[0_0_64px_rgba(0,255,160,0.35)] backdrop-blur-md transition-all duration-300 space-y-6">
      <div className="text-sm uppercase tracking-[0.2em] text-emerald-400/90 font-bold">
        🧬 Mutation Sandbox Monitor
      </div>

      {mutations.length === 0 ? (
        <div className="text-sm text-white/60 font-mono">⏳ Waiting for mutation data from Tex...</div>
      ) : (
        mutations.map((mutation, idx) => (
          <div
            key={idx}
            className={`border rounded-xl p-4 backdrop-blur-sm transition-all duration-200 space-y-2 ${
              mutation.status === 'SUCCESS'
                ? 'border-emerald-500/20 bg-black/60 shadow-inner shadow-emerald-500/10'
                : mutation.status === 'FAILURE'
                ? 'border-rose-500/20 bg-black/50 shadow-inner shadow-rose-500/10'
                : 'border-amber-500/20 bg-black/50 shadow-inner shadow-amber-500/10'
            }`}
          >
            <div className="text-xs text-white/40 tracking-wider">
              🌀 CYCLE {mutation.cycle} • ⏱ {mutation.timestamp}
            </div>

            <div className="text-sm font-mono text-white/90">
              ⚙️ <span className="font-semibold">Mutation ID:</span> {mutation.mutationId}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono text-white/80">
              <div>
                🔁 <span className="font-semibold">Trigger:</span> {mutation.trigger}
              </div>
              <div>
                📍 <span className="font-semibold">Target:</span> {mutation.patchTarget}
              </div>
              <div>
                🧠 <span className="font-semibold">Type:</span> {mutation.mutationType}
              </div>
              <div>
                🧾 <span className="font-semibold">Status:</span>{' '}
                <span
                  className={
                    mutation.status === 'SUCCESS'
                      ? 'text-emerald-400'
                      : mutation.status === 'FAILURE'
                      ? 'text-rose-400'
                      : 'text-amber-300'
                  }
                >
                  {mutation.status}
                </span>
              </div>
            </div>

            <div className="text-sm text-white/80">
              💬 <span className="font-semibold">Description:</span>{' '}
              <span className="italic text-white/60">{mutation.description}</span>
            </div>

            <div className="text-xs text-white/50 break-all">
              🧬 Mutation Hash: <span className="text-fuchsia-500">{mutation.hash}</span>
            </div>
          </div>
        ))
      )}

      <div className="absolute inset-0 rounded-3xl border border-emerald-400/5 animate-pulse pointer-events-none" />
    </div>
  );
}