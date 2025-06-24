import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        fluid: "clamp(8px, 0.95vw, 11px)",
        "fluid-sm": "clamp(7px, 0.85vw, 10px)",
        "fluid-lg": "clamp(10px, 1.15vw, 13px)",
        "title-xl": "clamp(1.6rem, 2.5vw, 2.8rem)",
        "reflex-lg": "clamp(1.2rem, 1.8vw, 2.1rem)",
        "core-sm": "clamp(0.8rem, 1vw, 1.1rem)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sovereignCyan: "#00F0FF",
        crimson: "#FF365D",
        indigoCore: "#5A6BFF",
        violetMeta: "#D74EFF",
        entropyBlue: "#00C8FF",
        contradictionRed: "#FF5C5C",
        reflexGold: "#ffaa00",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        panel: "1.25rem",
      },
      boxShadow: {
        panel: "0 0 20px rgba(0, 0, 0, 0.25)",
        cinematic: "0 0 90px rgba(0, 240, 255, 0.25)",
        cognitive: "0 0 140px rgba(0, 240, 255, 0.2)",
        sovereignGlow: "0 0 80px rgba(0, 240, 255, 0.6)",
      },
      backdropBlur: {
        intense: "20px",
      },
      zIndex: {
        100: "100",
        200: "200",
        300: "300",
      },
      spacing: {
        '2xs': '0.25rem',
        'xs': '0.5rem',
        'sm': '0.75rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
      },
      animation: {
        fadeIn: "fadeInOut 3s ease-in-out",
        'spin-slow': "spin 24s linear infinite",
        'pulse-fade': "pulseFade 5s ease-in-out infinite",
        'ripple-ping': "ripplePing 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        pulseFade: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        ripplePing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.2' },
          '70%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".glass-panel": {
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "1.25rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.25)",
        },
        ".glow-cyan": {
          boxShadow: "0 0 10px #00F0FF, 0 0 20px #00F0FF",
        },
        ".glow-crimson": {
          boxShadow: "0 0 10px #FF365D, 0 0 20px #FF365D",
        },
        ".glow-indigo": {
          boxShadow: "0 0 10px #5A6BFF, 0 0 20px #5A6BFF",
        },
        ".glow-violet": {
          boxShadow: "0 0 10px #D74EFF, 0 0 20px #D74EFF",
        },
        ".signal-line": {
          backgroundImage: "linear-gradient(to bottom, rgba(0,240,255,0), rgba(0,240,255,0.6), rgba(0,240,255,0))",
          width: "2px",
          opacity: "0.8",
        },
      });
    },
  ],
};

export default config;