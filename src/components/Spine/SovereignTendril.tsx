'use client'

import * as THREE from 'three'
import { useRef } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import vertexShader from '@/shaders/tendrilVertex.glsl'
import fragmentShader from '@/shaders/tendrilFragment.glsl'

// 🎨 Define custom shader material
const TendrilMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0.1, 0.8, 1.0) },
  vertexShader,
  fragmentShader
)

// 🧠 Register material with Three.js
extend({ TendrilMaterial })

// ✅ Allow JSX <tendrilMaterial /> syntax with fallback typing
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      tendrilMaterial: {
        ref?: React.Ref<THREE.ShaderMaterial>
        attach?: string
        [key: string]: any
      }
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export default function SovereignTendril() {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <tendrilMaterial ref={matRef} attach="material" />
    </mesh>
  )
}