/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        serif: ['"Space Mono"', 'monospace'],
        mono: ['"Space Mono"', 'monospace'],
        display: ['"Anton SC"', 'sans-serif'],
      },
      colors: {
        bone: '#f6f4f0',
        paper: '#fffefc',
        ink: '#12100e',
        walnut: '#6b4a2f',
        gold: '#a87c3e',
        'gold-soft': '#c9a96a',
      },
    },
  },
  plugins: [],
};
