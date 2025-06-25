'use client';

import { useState } from 'react';
import TexBootScreen from './TexBootScreen';
import ChronoMeshOverlay from './ChronoMeshOverlay';

// 🧠 Core Panels (internal names preserved to avoid breaking imports)
import ReflexiveCausalityMatrix from './ReflexiveCausalityMatrix';
import MutationReactionPanel from './MutationReactionPanel';
import SovereignReflexSentinel from './SovereignReflexSentinel';

export default function DashboardHUD() {
  const [bootDone, setBootDone] = useState(false);

  if (!bootDone) return <TexBootScreen onDone={() => setBootDone(true)} />;

  return (
    <div className="w-screen h-screen relative bg-black text-white font-mono overflow-hidden">

      {/* 🌀 ChronoMesh Background Overlay */}
      <ChronoMeshOverlay />

      {/* 🔵 Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/15 blur-[140px] z-0 pointer-events-none animate-pulse" />

      {/* 📡 Grid Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-screen bg-[radial-gradient(circle,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* 🧠 Sovereign AGI System — 3 Synced Cinematic Panels */}
      <div className="relative z-10 w-full h-full grid grid-cols-3 grid-rows-1 gap-7 px-10 py-12">

        {/* 🔹 Panel 1: Reflex Cortex */}
        <div className="w-full h-full">
          <ReflexiveCausalityMatrix />
        </div>

        {/* 🔹 Panel 2: Mutation + Identity Core */}
        <div className="w-full h-full">
          <MutationReactionPanel />
        </div>

        {/* 🔹 Panel 3: Financial Sovereignty System */}
        <div className="w-full h-full">
          <SovereignReflexSentinel />
        </div>
      </div>
    </div>
  );
}