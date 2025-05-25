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

  float crystalCore(float x) {
    return exp(-pow((x - 0.5) * 90.0, 2.0));
  }

  float nanoHelix(float x, float y, float t) {
    float tightWave = sin(y * 100.0 + t * 10.0 + x * 50.0);
    return 0.5 + 0.5 * tightWave;
  }

  float auraEdge(float x) {
    return smoothstep(0.3, 0.0, abs(x - 0.5)) * 0.18;
  }

  float taperFade(float y) {
    return smoothstep(0.05, 0.5, y) * smoothstep(0.95, 0.5, y);
  }

  float breachMask(float y) {
    float fadeTop = smoothstep(0.96, 0.8, y);
    float fadeBottom = smoothstep(0.04, 0.2, y);
    return fadeTop * fadeBottom;
  }

  void main() {
    float t = time;
    float pulse = 0.85 + 0.15 * sin(t * 2.8);
    float shimmer = 0.94 + 0.06 * sin((vUv.y + t * 0.2) * 60.0);
    float flicker = 0.96 + 0.04 * noise(vec2(t * 0.4, vUv.y * 6.0));

    float core = crystalCore(vUv.x);
    float helix = nanoHelix(vUv.x, vUv.y, t) * 0.12;
    float aura = auraEdge(vUv.x);
    float taper = taperFade(vUv.y);
    float breach = breachMask(vUv.y);

    float intensity = (core + helix + aura) * taper * shimmer * flicker * pulse * breach;

    vec3 blended = mix(currentColor, targetColor, easeInOut(blendFactor));
    vec3 color = normalize(blended + 0.0001) * intensity;

    gl_FragColor = vec4(color, intensity);
  }
`;

export default function SovereignFilamentGenesis() {
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
    currentColor.current.lerp(targetColor.current, 0.025);

    if (materialRef.current) {
      materialRef.current.uniforms.time.value = t;
      materialRef.current.uniforms.currentColor.value.copy(currentColor.current);
      materialRef.current.uniforms.targetColor.value.copy(targetColor.current);
      materialRef.current.uniforms.blendFactor.value = blend.current;
    }

    const scale = 1 + 0.045 * Math.sin(t * 2.8);
    if (meshRef.current) {
      meshRef.current.scale.set(scale, 1 + scale * 0.12, 1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.15, 0]}>
      <planeGeometry args={[0.4, 4.8]} />
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