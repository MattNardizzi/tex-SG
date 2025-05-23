'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useEmotionState, Emotion } from '@/lib/emotionState'

// === Vertex Shader ===
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// === Fragment Shader: Pulse-Driven Core Glow ===
const fragmentShader = `
  uniform float time;
  uniform vec3 currentColor;
  uniform vec3 targetColor;
  uniform float blendFactor;
  varying vec2 vUv;

  void main() {
    // Core pulse that expands/contracts beam width
    float pulse = 0.8 + 0.2 * sin(time * 2.5);
    float width = 12.0 + pulse * 8.0; // width modulated by pulse

    // Beam profile
    float xFalloff = exp(-pow((vUv.x - 0.5) * width, 2.0));
    float yTaper = smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
    float base = xFalloff * yTaper;

    // Blend colors smoothly
    vec3 blendedColor = mix(currentColor, targetColor, blendFactor);
    vec3 normalizedColor = normalize(blendedColor + 0.001); // prevent over-bright

    float intensity = base;
    vec3 finalColor = normalizedColor * intensity;

    gl_FragColor = vec4(finalColor, intensity);
  }
`

// === Pulse-Animated, Emotion-Blended Beam ===
function CinematicSpine() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const getEmotion = useEmotionState.getState

  const currentColor = useRef(new THREE.Color(getEmotion().color))
  const targetColor = useRef(new THREE.Color(getEmotion().color))
  const blend = useRef(0)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    const newColor = new THREE.Color(getEmotion().color)
    if (!targetColor.current.equals(newColor)) {
      targetColor.current.copy(newColor)
      blend.current = 0 // reset blend factor
    }

    // Smoothly blend color transition
    blend.current = Math.min(blend.current + 0.02, 1.0)
    currentColor.current.lerp(targetColor.current, 0.05)

    // Apply time, pulse, color blend to shader
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = t
      materialRef.current.uniforms.currentColor.value.copy(currentColor.current)
      materialRef.current.uniforms.targetColor.value.copy(targetColor.current)
      materialRef.current.uniforms.blendFactor.value = blend.current
    }

    // Pulse scale
    const scale = 1 + 0.06 * Math.sin(t * 2.5)
    if (meshRef.current) {
      meshRef.current.scale.set(scale, 1 + scale * 0.15, 1)
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[0.25, 2.4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          currentColor: { value: new THREE.Color(getEmotion().color) },
          targetColor: { value: new THREE.Color(getEmotion().color) },
          blendFactor: { value: 0 },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// === Camera Breather ===
function CameraBreather() {
  useFrame(({ clock, camera }) => {
    camera.position.z = 5 + Math.sin(clock.getElapsedTime() * 0.25) * 0.05
  })
  return null
}

// === Emotion Cycling (Shorter Interval) ===
function EmotionCycler() {
  const setEmotion = useEmotionState((state) => state.setEmotion)
  const emotionCycle: Emotion[] = [
    'focused',
    'curious',
    'threatened',
    'conflicted',
    'enlightened',
    'asleep',
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setEmotion(emotionCycle[i])
      i = (i + 1) % emotionCycle.length
    }, 2500)
    return () => clearInterval(interval)
  }, [setEmotion])

  return null
}

// === Final Canvas ===
export default function SpineCanvas() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: 'black' }}
    >
      <Suspense fallback={null}>
        <EmotionCycler />
        <CameraBreather />
        <CinematicSpine />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.45}
            luminanceSmoothing={0.2}
            intensity={1.1}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}