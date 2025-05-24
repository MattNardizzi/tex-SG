'use client';

import SpineCanvas from '@/components/Spine/SpineCanvas';
import MutationLogPanel from '@/components/panels/MutationLogPanel';
import SovereignStatusPanel from '@/components/panels/SovereignStatusPanel';
import SovereignTextbox from '@/components/ui/SovereignTextbox';

export default function Home() {
  return (
    <main className="relative h-screen w-screen bg-black font-grotesk overflow-hidden">

      {/* Mutation Log Panel – 150px left of center */}
      <MutationLogPanel className="absolute top-12 left-[calc(50%-150px)]" />

      {/* Sovereign Status Panel – 150px right of center */}
      <SovereignStatusPanel className="absolute top-12 left-[calc(50%+150px)] -translate-x-full" />

      {/* Central 3D Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SpineCanvas className="h-[90vh] w-full max-w-[90vw]" />
      </div>

      {/* Textbox at bottom center */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[400px]">
        <SovereignTextbox />
      </div>
    </main>
  );
}