import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Added layout folder
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'], // For titles
        body: ['"Inter"', 'sans-serif'],            // For panel text
      },
      fontSize: {
        fluid: "clamp(8px, 0.95vw, 11px)",       // Main panel font
        "fluid-sm": "clamp(7px, 0.85vw, 10px)",  // Sub-labels
        "fluid-lg": "clamp(10px, 1.15vw, 13px)", // Headings
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sovereignCyan: "#00F0FF",   // Core Cognition
        crimson: "#FF365D",         // Override / Intervention
        indigoCore: "#5A6BFF",      // Strategy / Forecast
        violetMeta: "#D74EFF",      // Meta / Reflex / Memory
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        panel: "1.25rem",
      },
      boxShadow: {
        panel: "0 0 20px rgba(0, 0, 0, 0.25)",
        cinematic: "0 0 90px rgba(0, 240, 255, 0.25)", // ✅ Added cinematic shadow
      },
      backdropBlur: {
        intense: "20px",
      },
      zIndex: {
        100: '100',
        200: '200',
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
      });
    },
  ],
};

export default config;