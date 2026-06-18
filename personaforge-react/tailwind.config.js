/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        surface: '#111118',
        card: '#16161E',
        card2: '#1C1C26',
        border: 'rgba(255,255,255,0.07)',
        borderH: 'rgba(255,255,255,0.13)',
        purple: { DEFAULT: '#7C6FE0', b: '#9B8EF5' },
        teal: '#2DD4A8',
        textc: '#F2F0FF',
        muted: '#9896B0',
        dim: '#5C5A72',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        xl2: '14px',
      },
      boxShadow: {
        purpleGlow: '0 4px 16px rgba(124,111,224,0.3)',
        purpleGlowLg: '0 8px 32px rgba(124,111,224,0.4)',
      },
      keyframes: {
        fadeSlide: {
          from: { opacity: 0, transform: 'translateX(12px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        pulseDot: {
          '0%,100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(0.8)' },
        },
      },
      animation: {
        fadeSlide: 'fadeSlide 0.3s ease',
        fadeIn: 'fadeIn 0.2s ease',
        floatY: 'floatY 4s ease-in-out infinite',
        spinSlow: 'spin-slow 4s linear infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
