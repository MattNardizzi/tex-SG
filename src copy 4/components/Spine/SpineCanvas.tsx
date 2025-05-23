'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useEmotionState, Emotion } from '@/lib/emotionState'
import SovereignSpineCinematic from './SovereignSpineCinematic'

// === Subtle Camera Motion ===
function CameraBreather() {
  return null // Optional drift removed for stability; re-add if needed
}

// === Auto Emotion Cycler (2.5s loop) ===
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