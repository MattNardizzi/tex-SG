'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import vertexShader from '@/shaders/tendrilVertex.glsl'
import fragmentShader from '@/shaders/tendrilFragment.glsl'

// Create custom shader material
const TendrilMaterial = shaderMaterial(
  { uTime: 0 },
  vertexShader,
  fragmentShader
)

extend({ TendrilMaterial })

export default function SovereignTendril({
  start,
  end,
}: {
  start: THREE.Vector3
  end: THREE.Vector3
}) {
  const ref = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)

  const curve = new THREE.CatmullRomCurve3([
    start,
    new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).add(new THREE.Vector3(0.2, 0, 0)),
    end,
  ])

  const geometry = new THREE.TubeGeometry(curve, 32, 0.03, 8, false)

  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh ref={ref} geometry={geometry}>
      <tendrilMaterial ref={mat} />
    </mesh>
  )
}