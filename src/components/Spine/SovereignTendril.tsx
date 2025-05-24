import { shaderMaterial } from '@react-three/drei'
import { extend, ReactThreeFiber } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from '@/shaders/tendrilVertex.glsl'
import fragmentShader from '@/shaders/tendrilFragment.glsl'

// 1. Create the material
const TendrilMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.1, 0.8, 1),
  },
  vertexShader,
  fragmentShader
)

// 2. Extend it into the JSX system
extend({ TendrilMaterial })

// 3. Extend JSX typing for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      tendrilMaterial: ReactThreeFiber.Object3DNode<typeof TendrilMaterial, typeof TendrilMaterial>
    }
  }
}