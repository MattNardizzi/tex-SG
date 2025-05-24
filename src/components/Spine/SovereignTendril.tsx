'use client'

import * as THREE from 'three'
import { useRef } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame, ReactThreeFiber } from '@react-three/fiber'
import vertexShader from '@/shaders/tendrilVertex.glsl'
import fragmentShader from '@/shaders/tendrilFragment.glsl'

// 🔧 Create custom shader material
const TendrilMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0.1, 0.8, 1) },
  vertexShader,
  fragmentShader
)

// 📦 Register with Three.js
extend({ TendrilMaterial })

/* eslint-disable @typescript-eslint/no-namespace */
// ✅ Allow JSX to recognize <tendrilMaterial />
declare global {
  namespace JSX {
    interface IntrinsicElements {
      tendrilMaterial: ReactThreeFiber.Object3DNode<typeof TendrilMaterial, typeof TendrilMaterial>
    }
  }
}

export default function SovereignTendril() {
  const ref = useRef<THREE.Mesh>(null)
  const mat = useRef<any>(null)

  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)

  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.uTime = clock.getElapsedTime()
    }
    if (ref.current) {
      ref.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={ref} geometry={geometry}>
      <tendrilMaterial ref={mat} />
    </mesh>
  )
}