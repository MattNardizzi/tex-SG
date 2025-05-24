'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useMemo } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import SovereignSpineCinematic from './SovereignSpineCinematic'; // ✅ Correct import
import { useEmotionState, Emotion } from '@/lib/emotionState';

interface SpineCanvasProps {
  className?: string;
}

// === Emotion Cycler ===
function EmotionCycler() {
  const setEmotion = useEmotionState((state) => state.setEmotion);

  const emotionCycle: Emotion[] = useMemo(
    () => ['focused', 'curious', 'threatened', 'conflicted', 'enlightened', 'asleep'],
    []
  );

  const indexRef = useRef(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setEmotion(emotionCycle[0]);
    }, 750);

    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % emotionCycle.length;
      setEmotion(emotionCycle[indexRef.current]);
    }, 4500);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [setEmotion, emotionCycle]);

  return null;
}

// === Main Spine Canvas ===
export default function SpineCanvas({ className = '' }: SpineCanvasProps) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <Suspense fallback={null}>
          <EmotionCycler />
          <group position={[0, 0, -2]}>
            <SovereignSpineCinematic />
          </group>
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.4}
              luminanceSmoothing={0.15}
              intensity={1.1}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}