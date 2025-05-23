uniform float time;
varying vec2 vUv;

void main() {
  // Distance from vertical center (for width taper)
  float taper = 1.0 - abs(vUv.y - 0.5) * 2.0;

  // Sharper fade at ends
  float edgeFade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

  // Pulse brightness
  float pulse = 0.6 + 0.4 * sin(time * 2.0);

  // Beam brightness based on center taper
  float intensity = taper * edgeFade * pulse;

  vec3 color = vec3(0.0, 1.0, 0.8) * intensity;
  gl_FragColor = vec4(color, intensity);
}