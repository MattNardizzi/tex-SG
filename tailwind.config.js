/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        /* 1 – fonts */
        fontFamily: { grotesk: ['"Space Grotesk"', 'sans-serif'] },
  
        /* 2 – layout helpers */
        width:  { panel: '16rem' },   // 256 px
        height: { spine: '90vh'  },
  
        /* 3 – color palette */
        colors: {
          primary:   '#7d3cff',   // purple accent
          bg:        '#0a0a0a',   // page background
          fg:        '#ededed',   // page foreground
          panelBg:   '#10101080', // translucent panel
          panelRing: '#ffffff33',
        },
      },
    },
    plugins: [require('@tailwindcss/typography')],
  };