'use client';

import SpineCanvas from '../../components/Spine/SpineCanvas';
import MutationLogPanel from '../../components/panels/MutationLogPanel';
import SovereignStatusPanel from '../../components/panels/SovereignStatusPanel';
import SovereignTextbox from '../../components/ui/SovereignTextbox';

export default function MainPage() {
  return (
    <div className="relative w-full h-screen bg-black font-grotesk overflow-hidden">
      {/* R3F Canvas */}
      <SpineCanvas />

      {/* UI Panels */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-5 left-5 pointer-events-auto">
          <MutationLogPanel />
        </div>
        <div className="absolute top-5 right-5 pointer-events-auto">
          <SovereignStatusPanel />
        </div>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <SovereignTextbox />
        </div>
      </div>
    </div>
  );
}