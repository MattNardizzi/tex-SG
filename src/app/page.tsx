'use client';

import { Canvas } from '@react-three/fiber';
import TexScene from '../components/_3d/TexScene';
import MutationLogPanel from '../components/panels/MutationLogPanel';
import SovereignStatusPanel from '../components/panels/SovereignStatusPanel';
import SovereignTextbox from '../components/ui/SovereignTextbox';

export default function MainPage() {
  return (
    <div className="relative w-full h-screen bg-black font-grotesk overflow-hidden">
      {/* 3D Canvas */}
      <Canvas>
        <TexScene />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top Left Panel */}
        <div className="absolute top-5 left-5 pointer-events-auto">
          <MutationLogPanel />
        </div>

        {/* Top Right Panel */}
        <div className="absolute top-5 right-5 pointer-events-auto">
          <SovereignStatusPanel />
        </div>

        {/* Bottom Center Chatbox */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto">
          <SovereignTextbox />
        </div>
      </div>
    </div>
  );
}