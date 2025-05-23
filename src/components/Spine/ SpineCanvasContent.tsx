'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useEmotionState, Emotion } from '@/lib/emotionState'
import SovereignSpineCinematic from './SovereignSpineCinematic'

function CameraBreather() {
  useFrame(({ clock, camera }) => {
    camera.position.z = 5 + Math.sin(clock.getElapsedTime() * 0.25) * 0.05
  })
  return null
}

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
    }, 2800)
    return () => clearInterval(interval)
  }, [setEmotion])

  return null
}

export default function SpineCanvasContent() {
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
            luminanceThreshold={0.35}
            luminanceSmoothing={0.15}
            intensity={1.2}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}