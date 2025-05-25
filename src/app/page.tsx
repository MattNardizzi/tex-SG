'use client';

import { Canvas } from '@react-three/fiber';
import TexScene from '../../components/_3d/TexScene';
import MutationLogPanel from '../../components/panels/MutationLogPanel';
import SovereignStatusPanel from '../../components/panels/SovereignStatusPanel';
import SovereignTextbox from '../../components/ui/SovereignTextbox';

export default function MainPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-grotesk">
      {/* 3D Canvas Scene */}
      <Canvas>
        <TexScene />
      </Canvas>

      {/* Overlay UI Panels */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top-Left: Mutation Log */}
        <div className="absolute top-5 left-5 pointer-events-auto">
          <MutationLogPanel />
        </div>

        {/* Top-Right: Status Panel */}
        <div className="absolute top-5 right-5 pointer-events-auto">
          <SovereignStatusPanel />
        </div>

        {/* Bottom-Center: Chat Textbox */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <SovereignTextbox />
        </div>
      </div>
    </div>
  );
}