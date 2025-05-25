'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
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
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float crystalCore(float x) {
    return exp(-pow((x - 0.5) * 90.0, 2.0)); // Enhanced sparkle beam
  }

  float helix(float x, float y, float t) {
    float ripple = sin(y * 36.0 + t * 8.0 + x * 40.0); // Best helix motion
    return 0.5 + 0.5 * ripple;
  }

  float taperFade(float y) {
    float top = smoothstep(1.0, 0.84, y);
    float bottom = smoothstep(0.0, 0.16, y);
    return top * bottom;
  }

  float radialFade(vec2 uv) {
    return smoothstep(0.48, 0.08, length(uv - vec2(0.5)));
  }

  void main() {
    float t = time;

    float pulse = 0.88 + 0.12 * sin(t * 2.5);
    float flicker = 0.97 + 0.03 * noise(vec2(t * 0.5, vUv.y * 4.0));
    float shimmer = 0.94 + 0.06 * sin((vUv.y + t * 0.25) * 60.0);

    float core = crystalCore(vUv.x);
    float helixWrap = helix(vUv.x, vUv.y, t);
    float aura = smoothstep(0.3, 0.0, abs(vUv.x - 0.5)) * 0.16;

    float fadeY = taperFade(vUv.y);
    float fadeRadial = radialFade(vUv);

    float total = (core * 1.6 + helixWrap * 0.25 + aura) * shimmer * flicker * pulse * fadeY * fadeRadial;

    vec3 blend = mix(currentColor, targetColor, easeInOut(blendFactor));
    vec3 color = normalize(blend + 0.0001) * total;

    gl_FragColor = vec4(color, total);
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

    const scale = 1 + 0.04 * Math.sin(t * 2.5);
    if (meshRef.current) {
      meshRef.current.scale.set(scale, 1 + scale * 0.08, 1);
    }
  });

  return (
    <group>
      <Html position={[0, 2.1, 0]}>
        <div
          style={{
            fontSize: '15px',
            fontWeight: '900',
            letterSpacing: '0.25em',
            color: '#00ffff',
            fontFamily: 'Orbitron, sans-serif',
            textShadow: '0 0 10px rgba(0,255,255,0.5), 0 0 20px rgba(0,255,255,0.3)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          TEX
        </div>
      </Html>
      <mesh ref={meshRef} position={[0, -0.15, 0]}>
        <planeGeometry args={[0.42, 3.6]} />
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
    </group>
  );
}