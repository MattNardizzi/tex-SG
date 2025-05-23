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

// === Fragment Shader: Emotion-aware beam with adaptive pulse ===
const fragmentShader = `
  uniform float time;
  uniform vec3 glowColor;
  varying vec2 vUv;

  void main() {
    // Pulse affects width instead of brightness only
    float pulse = 1.0 + 0.15 * sin(time * 2.5);

    // Scaled center beam (thicker/thinner pulse)
    float xFalloff = exp(-pow((vUv.x - 0.5) * (14.0 / pulse), 2.0));

    // Vertical taper
    float yTaper = smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.5, vUv.y);

    // Base glow
    float base = xFalloff * yTaper;

    // Normalize glowColor to prevent blinding white/gold
    vec3 safeColor = normalize(glowColor + 0.001);
    float luminance = dot(safeColor, vec3(0.299, 0.587, 0.114)); // perceptual brightness
    float intensity = clamp(base * mix(0.6, 1.0, luminance), 0.0, 1.0);

    vec3 finalColor = safeColor * intensity;

    gl_FragColor = vec4(finalColor, intensity);
  }
`

// === Emotion-reactive Shader Beam ===
function CinematicSpine() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const getColor = useEmotionState.getState

  const currentColor = useRef(new THREE.Color(getColor().color))
  const targetColor = useRef(new THREE.Color(getColor().color))

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (materialRef.current) {
      // Update pulse time
      materialRef.current.uniforms.time.value = t

      // Smoothly lerp emotion color
      targetColor.current.set(getColor().color)
      currentColor.current.lerp(targetColor.current, 0.08)

      materialRef.current.uniforms.glowColor.value.set(
        currentColor.current.r,
        currentColor.current.g,
        currentColor.current.b
      )
    }
  })

  return (
    <mesh>
      <planeGeometry args={[0.25, 2.4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          glowColor: { value: new THREE.Color(getColor().color) },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// === Floating Camera Motion ===
function CameraBreather() {
  useFrame(({ clock, camera }) => {
    camera.position.z = 5 + Math.sin(clock.getElapsedTime() * 0.25) * 0.05
  })
  return null
}

// === Smooth Emotion Cycling Engine ===
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
    }, 4000)
    return () => clearInterval(interval)
  }, [setEmotion])

  return null
}

// === Final Cinematic Canvas ===
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
            luminanceThreshold={0.4}
            luminanceSmoothing={0.25}
            intensity={1.1}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}