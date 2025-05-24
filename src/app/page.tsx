'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import SpineCanvas from '@/components/Spine/SpineCanvas';
import {
  MutationLogPanelR3F,
  SovereignStatusPanelR3F,
  SovereignTextboxR3F
} from '@/components/panels/FiberPanels';

export default function Home() {
  return (
    <main className="relative h-screen w-screen bg-black overflow-hidden font-grotesk">
      <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          {/* 3D Spine Animation */}
          <SpineCanvas />

          {/* Panels rendered as HTML inside the 3D scene */}
          <MutationLogPanelR3F />
          <SovereignStatusPanelR3F />
          <SovereignTextboxR3F />

          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.4}
              luminanceSmoothing={0.15}
              intensity={1.1}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </main>
  );
}