'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEmotionState } from '@/lib/emotionState';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader – Hybrid Godmode: Crystal Core + Rotating Helix + Sparkle
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

  float crystalGlow(float x) {
    return exp(-pow((x - 0.5) * 50.0, 2.0));
  }

  float helixTrail(vec2 uv, float time) {
    float angle = uv.y * 12.0 + time * 3.0;
    float offset = 0.03 * sin(angle);
    float trail = exp(-pow((uv.x - 0.5 - offset) * 90.0, 2.0));
    return trail * 0.8;
  }

  float sparkle(vec2 uv, float time) {
    float flicker = sin((uv.y + time * 0.4) * 40.0) * cos((uv.x + time * 0.3) * 60.0);
    return smoothstep(0.95, 1.0, flicker) * 0.2;
  }

  void main() {
    float t = time;

    float pulse = 0.8 + 0.2 * sin(t * 2.2);
    float shimmer = 0.96 + 0.04 * sin((vUv.y + t * 0.2) * 48.0);
    float flicker = 0.97 + 0.03 * noise(vec2(t * 0.5, vUv.y * 4.0));
    float width = 11.0 + pulse * 6.0;

    float xFalloff = exp(-pow((vUv.x - 0.5) * width, 2.0));
    float yTaper = smoothstep(0.04, 0.5, vUv.y) * smoothstep(0.96, 0.5, vUv.y);
    float core = crystalGlow(vUv.x);
    float helix = helixTrail(vUv, t);
    float spark = sparkle(vUv, t);

    float base = (xFalloff + core * 1.2 + helix + spark) * yTaper * shimmer * flicker;

    vec3 blendedColor = mix(currentColor, targetColor, easeInOut(blendFactor));
    vec3 finalColor = normalize(blendedColor + 0.0001) * base;

    gl_FragColor = vec4(finalColor, base);
  }
`;

export default function SovereignSpineCinematic() {
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
      threatened: '#ff3333',
      conflicted: '#a648ff',
      enlightened: '#ffffff',
      asleep: '#aaaaaa',
    };

    const nextColor = new THREE.Color(emotionColors[emotion] || '#00ccff');

    if (!targetColor.current.equals(nextColor)) {
      targetColor.current.copy(nextColor);
      blend.current = 0;
    }

    blend.current = Math.min(blend.current + 0.015, 1);
    currentColor.current.lerp(targetColor.current, 0.025);

    if (materialRef.current) {
      materialRef.current.uniforms.time.value = t;
      materialRef.current.uniforms.currentColor.value.copy(currentColor.current);
      materialRef.current.uniforms.targetColor.value.copy(targetColor.current);
      materialRef.current.uniforms.blendFactor.value = blend.current;
    }

    const scale = 1 + 0.045 * Math.sin(t * 2.4);
    if (meshRef.current) {
      meshRef.current.scale.set(scale, 1 + scale * 0.08, 1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.175, 0]}>
      <planeGeometry args={[0.5, 5.2]} />
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