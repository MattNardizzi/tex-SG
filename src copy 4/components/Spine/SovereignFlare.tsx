'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEmotionState } from '@/lib/emotionState'

export default function SovereignFlare({ height = 18 }: { height?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { emotion } = useEmotionState()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (meshRef.current) {
      const shouldFlash =
        emotion === 'threatened' ||
        emotion === 'conflicted' ||
        emotion === 'enlightened'

      const intensity = shouldFlash ? Math.abs(Math.sin(t * 8)) : 0.001
      meshRef.current.scale.setScalar(0.5 + intensity * 2)
    }
  })

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.13, 0.13, height, 32]} />
      <meshStandardMaterial
        emissive={new THREE.Color('#ffffff')}
        emissiveIntensity={1.8}
        transparent
        opacity={0.25}
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
  )
}