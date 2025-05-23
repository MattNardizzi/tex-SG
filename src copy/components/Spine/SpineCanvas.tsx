'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// === Vertex Shader ===
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// === Fragment Shader (with thicker center beam) ===
const fragmentShader = `
  uniform float time;
  varying vec2 vUv;

  void main() {
    // Vertical taper top and bottom
    float verticalTaper = smoothstep(0.05, 0.5, vUv.y) * smoothstep(0.95, 0.5, vUv.y);

    // Center beam with sharper peak but slightly wider
    float center = exp(-pow((vUv.x - 0.5) * 12.0, 2.0)); // <- was 18.0 before, now wider

    // Pulse animation
    float pulse = 0.75 + 0.25 * sin(time * 2.5);

    // Final color intensity
    float intensity = center * verticalTaper * pulse;
    vec3 color = vec3(0.0, 1.0, 0.95) * intensity;

    gl_FragColor = vec4(color, intensity);
  }
`

// === Glowing Beam Component ===
function CinematicSpine() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh>
      <planeGeometry args={[0.2, 3.5]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ time: { value: 0 } }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// === Camera Drift ===
function CameraBreather() {
  useFrame(({ clock, camera }) => {
    camera.position.z = 5 + Math.sin(clock.getElapsedTime() * 0.25) * 0.05
  })
  return null
}

// === Canvas Scene ===
export default function SpineCanvas() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: 'black' }}
    >
      <Suspense fallback={null}>
        <CameraBreather />
        <CinematicSpine />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.75} intensity={1.4} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}