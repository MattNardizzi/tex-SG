'use client'

import * as THREE from 'three'
import { useRef } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import vertexShader from '@/shaders/tendrilVertex.glsl'
import fragmentShader from '@/shaders/tendrilFragment.glsl'

// 🎨 Custom shader material definition
const TendrilMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0.1, 0.8, 1) },
  vertexShader,
  fragmentShader
)

extend({ TendrilMaterial })

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      tendrilMaterial: JSX.IntrinsicElements['meshStandardMaterial'] & {
        ref?: React.Ref<THREE.ShaderMaterial>
      }
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export default function SovereignTendril() {
  const ref = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)

  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)

  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (ref.current) {
      ref.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={ref} geometry={geometry}>
      <tendrilMaterial ref={mat} attach="material" />
    </mesh>
  )
}