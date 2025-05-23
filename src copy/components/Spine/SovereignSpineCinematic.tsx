'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEmotionState } from '@/lib/emotionState'
import SovereignFlare from './SovereignFlare'
import SpineBeamGlow from './SpineBeamGlow'

export default function SovereignSpineCinematic() {
  const beamRef = useRef<THREE.Mesh>(null)
  const { color } = useEmotionState()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (beamRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.012
      beamRef.current.scale.set(scale, 1, scale)

      const mat = beamRef.current.material as THREE.MeshStandardMaterial
      mat.emissive = new THREE.Color(color)
      mat.emissiveIntensity = 1.6 + Math.sin(t * 3) * 0.4
    }
  })

  return (
    <group>
      {/* Flare for emotional spike states */}
      <SovereignFlare height={10} />

      {/* Central sacred beam */}
      <mesh ref={beamRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 10, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={new THREE.Color(color)}
          emissiveIntensity={1.5}
          transparent
          opacity={0.15}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}