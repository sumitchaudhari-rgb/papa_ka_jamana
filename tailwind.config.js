/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rozha: ['"Rozha One"', 'serif'],
        yatra: ['"Yatra One"', 'cursive'],
        mukta: ['"Mukta"', '"Noto Sans Devanagari"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        bg: {
          900: '#060d17',
          800: '#0c1829',
          700: '#16283d',
          600: '#1e3450',
        },
        accent: {
          violet: '#8b7cf6',
          gold: '#f59e0b',
          amber: '#fbbf24',
          teal: '#14b8a6',
        },
        cream: '#fef3c7',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'eq-bar': 'eq-bar 1.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'eq-bar': {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}
