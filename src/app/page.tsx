'use client';

import MutationLogPanel      from '@/components/panels/MutationLogPanel';
import SovereignStatusPanel  from '@/components/panels/SovereignStatusPanel';
import SpineCanvas           from '@/components/Spine/SpineCanvas';
import SovereignTextbox      from '@/components/ui/SovereignTextbox';

export default function Home() {
  return (
    <main className="relative h-screen w-screen bg-black font-grotesk">
      {/* ── Left cognitive-feed panel ───────────────────── */}
      <div className="absolute left-4 top-4 w-64 max-w-[18rem] p-4
                      rounded-xl border border-white/20
                      bg-white/5 backdrop-blur-md">
        <MutationLogPanel />
      </div>

      {/* ── Right status panel ──────────────────────────── */}
      <div className="absolute right-4 top-4 w-64 max-w-[18rem] p-4
                      rounded-xl border border-white/20
                      bg-white/5 backdrop-blur-md">
        <SovereignStatusPanel />
      </div>

      {/* ── Central 3-D spine canvas ───────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SpineCanvas className="h-[90vh] w-full max-w-[90vw]" />
      </div>

      {/* ── Bottom textbox ─────────────────────────────── */}
      <div className="absolute left-4 bottom-4 w-[320px]">
        <SovereignTextbox />
      </div>
    </main>
  );
}