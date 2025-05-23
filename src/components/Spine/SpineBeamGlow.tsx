'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEmotionState } from '@/lib/emotionState'

export default function SpineBeamGlow({ height = 10 }: { height?: number }) {
  const beamRef = useRef<THREE.Mesh>(null)
  const { color } = useEmotionState()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (beamRef.current) {
      const scale = 1 + Math.sin(t * 2.4) * 0.01
      beamRef.current.scale.set(scale, 1, scale)

      const mat = beamRef.current.material as THREE.MeshStandardMaterial
      mat.emissive = new THREE.Color(color)
      mat.emissiveIntensity = 2 + Math.sin(t * 1.2) * 0.6
    }
  })

  return (
    <mesh ref={beamRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[0.03, 0.03, height, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive={new THREE.Color('#00fff7')}
        emissiveIntensity={1.5}
        transparent
        opacity={0.15}
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  )
}