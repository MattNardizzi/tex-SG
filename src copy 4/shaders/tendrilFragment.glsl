varying vec2 vUv;

void main() {
  float intensity = 1.0 - length(vUv - 0.5);
  intensity = pow(intensity, 3.0); // soft glowing core

  vec3 glowColor = vec3(0.0, 1.0, 1.0); // cyan
  gl_FragColor = vec4(glowColor * intensity, intensity);
}