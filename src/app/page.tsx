'use client';

import SpineCanvas from '@/components/Spine/SpineCanvas';
import MutationLogPanel from '@/components/panels/MutationLogPanel';
import SovereignStatusPanel from '@/components/panels/SovereignStatusPanel';
import SovereignTextbox from '@/components/ui/SovereignTextbox';

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen bg-black font-grotesk overflow-hidden">
      {/* Mutation Log Panel (self-positioned) */}
      <MutationLogPanel />

      {/* Sovereign Status Panel (self-positioned) */}
      <SovereignStatusPanel />

      {/* Central Spine Canvas */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-full max-w-[90vw] h-[90vh]">
          <SpineCanvas className="w-full h-full" />
        </div>
      </div>

      {/* Bottom-Centered Textbox */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-[420px]">
        <SovereignTextbox />
      </div>
    </main>
  );
}