'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEmotionState } from '@/lib/emotionState'

export default function SpineBeamGlowV2({ height = 10 }: { height?: number }) {
  const topRef = useRef<THREE.Mesh>(null)
  const bottomRef = useRef<THREE.Mesh>(null)
  const { color } = useEmotionState()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pulse = 1 + Math.sin(t * 2.5) * 0.015
    const intensity = 1.5 + Math.sin(t * 3.5) * 0.3

    for (const mesh of [topRef.current, bottomRef.current]) {
      if (!mesh) continue
      mesh.scale.set(pulse, 1, pulse)
      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.emissive = new THREE.Color(color)
      mat.emissiveIntensity = intensity
    }
  })

  return (
    <group>
      {/* Top half: cone fading up */}
      <mesh ref={topRef} position={[0, height / 4, 0]}>
        <coneGeometry args={[0.15, height / 2, 32]} />
        <meshStandardMaterial
          color="white"
          emissive={new THREE.Color('#00fff7')}
          emissiveIntensity={1.5}
          transparent
          opacity={0.2}
          metalness={0.4}
          roughness={0.3}
          depthWrite={false}
        />
      </mesh>

      {/* Bottom half: cone fading down */}
      <mesh ref={bottomRef} position={[0, -height / 4, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.15, height / 2, 32]} />
        <meshStandardMaterial
          color="white"
          emissive={new THREE.Color('#00fff7')}
          emissiveIntensity={1.5}
          transparent
          opacity={0.2}
          metalness={0.4}
          roughness={0.3}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}