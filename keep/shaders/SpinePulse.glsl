uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 p = position;
  float ripple = sin(uTime + p.y * 4.0) * 0.15;
  p.x += ripple;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}