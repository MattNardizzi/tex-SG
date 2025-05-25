'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotionState } from '@/lib/emotionState';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec3 currentColor;
  uniform vec3 targetColor;
  uniform float blendFactor;
  varying vec2 vUv;

  float easeInOut(float t) {
    return t * t * (3.0 - 2.0 * t);
  }

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float twinHelix(float x, float y, float t) {
    float phase1 = sin(y * 60.0 + t * 8.0 + x * 40.0);
    float phase2 = sin(y * 60.0 + t * 10.5 + x * 40.0 + 3.14);
    return (0.5 + 0.5 * phase1) * (0.5 + 0.5 * phase2);
  }

  float sparkles(vec2 uv, float t) {
    float grid = floor(uv.y * 50.0) * 0.1;
    float flicker = fract(sin(dot(vec2(uv.x * 30.0, uv.y * 60.0 + t), vec2(12.9898, 78.233))) * 43758.5453);
    return step(0.995, flicker) * 0.25;
  }

  void main() {
    float t = time;
    float pulse = 0.85 + 0.15 * sin(t * 2.4);
    float shimmer = 0.93 + 0.07 * sin((vUv.y + t * 0.2) * 50.0);
    float flicker = 0.96 + 0.04 * noise(vec2(t * 0.4, vUv.y * 6.0));

    float xFalloff = exp(-pow((vUv.x - 0.5) * 30.0, 2.0));
    float taper = smoothstep(0.05, 0.5, vUv.y) * smoothstep(0.95, 0.5, vUv.y);

    float core = exp(-pow((vUv.x - 0.5) * 80.0, 2.0));
    float helix = twinHelix(vUv.x, vUv.y, t) * 0.2;
    float sparkle = sparkles(vUv, t);

    float signal = smoothstep(0.0, 0.015, abs(mod(t * 0.5, 1.0) - vUv.y));

    float total = (core + helix + sparkle + signal) * taper * shimmer * flicker * pulse;

    vec3 blendedColor = mix(currentColor, targetColor, easeInOut(blendFactor));
    vec3 finalColor = normalize(blendedColor + 0.0001) * total;

    gl_FragColor = vec4(finalColor, total);
  }
`;

export default function SovereignQuantumSpine() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const getEmotion = useEmotionState.getState;
  const currentColor = useRef(new THREE.Color(getEmotion().color));
  const targetColor = useRef(new THREE.Color(getEmotion().color));
  const blend = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const emotion = getEmotion().emotion;

    const emotionColors: Record<string, string> = {
      focused: '#00ccff',
      curious: '#00ffaa',
      threatened: '#ff2222',
      conflicted: '#a64aff',
      enlightened: '#ffffff',
      asleep: '#444444',
    };

    const nextColor = new THREE.Color(emotionColors[emotion] || '#00ccff');

    if (!targetColor.current.equals(nextColor)) {
      targetColor.current.copy(nextColor);
      blend.current = 0;
    }

    blend.current = Math.min(blend.current + 0.01, 1);
    currentColor.current.lerp(targetColor.current, 0.03);

    if (materialRef.current) {
      materialRef.current.uniforms.time.value = t;
      materialRef.current.uniforms.currentColor.value.copy(currentColor.current);
      materialRef.current.uniforms.targetColor.value.copy(targetColor.current);
      materialRef.current.uniforms.blendFactor.value = blend.current;
    }

    const scale = 1 + 0.04 * Math.sin(t * 2.6);
    if (meshRef.current) {
      meshRef.current.scale.set(scale, 1 + scale * 0.1, 1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.15, 0]}>
      <planeGeometry args={[0.42, 4.9]} />
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
  );
}
