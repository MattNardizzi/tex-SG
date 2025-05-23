'use client';

import SpineCanvas from '@/components/Spine/SpineCanvas';
import MutationLogPanel from '@/components/panels/MutationLogPanel';
import SovereignStatusPanel from '@/components/panels/SovereignStatusPanel';
import SovereignTextbox from '@/components/ui/SovereignTextbox';

export default function Home() {
  return (
    <main className="relative h-screen w-screen bg-black font-grotesk overflow-hidden">
      {/* Mutation Log Panel (self-positioned) */}
      <MutationLogPanel />

      {/* Sovereign Status Panel (self-positioned) */}
      <SovereignStatusPanel />

      {/* Central Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SpineCanvas className="h-[90vh] w-full max-w-[90vw]" />
      </div>

      {/* Bottom-Centered Textbox */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[400px]">
        <SovereignTextbox />
      </div>
    </main>
  );
}