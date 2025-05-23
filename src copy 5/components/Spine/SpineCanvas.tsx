'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useEmotionState, Emotion } from '@/lib/emotionState'
import SovereignSpineCinematic from './SovereignSpineCinematic'

// === Subtle Camera Motion ===
function CameraBreather() {
  return null // Optional drift removed for stability
}

// === Emotion Cycle with Soft Fade and Faster Loop ===
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

  const indexRef = useRef(0)

  useEffect(() => {
    // Trigger first emotion change after 750ms
    const startTimeout = setTimeout(() => {
      setEmotion(emotionCycle[0])
    }, 750)

    // Continue cycling every 4.5 seconds
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % emotionCycle.length
      setEmotion(emotionCycle[indexRef.current])
    }, 4500)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(interval)
    }
  }, [setEmotion])

  return null
}

// === Final Canvas Scene ===
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
        <SovereignSpineCinematic />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.45}
            luminanceSmoothing={0.2}
            intensity={1.0}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}