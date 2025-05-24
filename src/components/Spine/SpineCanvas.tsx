'use client'

import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import MutationLogPanel from '@/components/panels/MutationLogPanel'
import SovereignStatusPanel from '@/components/panels/SovereignStatusPanel'
import SovereignTextbox from '@/components/ui/SovereignTextbox'
import TexSpine from './TexSpine' // your 3D spine visual

export default function SpineCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 30 }}>
      {/* === 3D Spine Core === */}
      <TexSpine />

      {/* === Mutation Log (left of spine) === */}
      <Html position={[-2.2, 1.4, 0]} transform occlude>
        <div className="w-[180px] scale-[0.9]">
          <MutationLogPanel />
        </div>
      </Html>

      {/* === Sovereign Status (right of spine) === */}
      <Html position={[2.2, 1.4, 0]} transform occlude>
        <div className="w-[200px] scale-[0.9]">
          <SovereignStatusPanel />
        </div>
      </Html>

      {/* === Sovereign Textbox (bottom center) === */}
      <Html position={[0, -1.8, 0]} transform occlude>
        <div className="w-[360px] scale-[0.95]">
          <SovereignTextbox />
        </div>
      </Html>
    </Canvas>
  )
}