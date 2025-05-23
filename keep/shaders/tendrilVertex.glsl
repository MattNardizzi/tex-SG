uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 pos = position;

  // Add sine-based ripple down the curve
  float wave = sin(pos.y * 10.0 + uTime * 4.0) * 0.05;
  float offset = sin(uTime + pos.y * 5.0) * 0.03;

  pos.x += wave;
  pos.z += offset;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}