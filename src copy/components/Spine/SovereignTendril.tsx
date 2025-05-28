'use client'

import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import vertexShader from '@/shaders/tendrilVertex.glsl'
import fragmentShader from '@/shaders/tendrilFragment.glsl'

// 🎨 Define the shader material
const TendrilMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0.1, 0.8, 1.0) },
  vertexShader,
  fragmentShader
)

extend({ TendrilMaterial })

export default function SovereignTendril() {
  const meshRef = useRef<THREE.Mesh>(null)

  // ✅ Memoized material instance — Vercel-safe
  const material = useMemo(() => new TendrilMaterial(), [])

  const geometry = useMemo(
    () => new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
    []
  )

  useFrame(({ clock }) => {
    if (material) {
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  )
}