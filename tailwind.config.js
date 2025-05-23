# overwrite or create tailwind.config.js at the project root
cat > tailwind.config.js <<'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/ui/**/*.{js,ts,jsx,tsx}',
    './src/components/panels/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      width: {
        panel: '16rem',   // side-panel width – adjust later if you wish
      },
      height: {
        spine: '90vh',    // canvas height inside the viewport
      },
      colors: {
        primary: '#7d3cff',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
EOF