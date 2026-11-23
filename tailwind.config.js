/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        codeland: {
          dark: '#0a0d14',
          card: '#111827',
          surface: '#1e293b',
          border: '#334155',
          model: '#38bdf8',
          'model-dark': '#0284c7',
          view: '#c084fc',
          'view-dark': '#9333ea',
          controller: '#34d399',
          'controller-dark': '#059669',
          gold: '#fbbf24',
          'gold-dark': '#d97706',
          ruby: '#f43f5e'
        }
      },
      fontFamily: {
        game: ['"Press Start 2P"', 'monospace', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        code: ['"Fira Code"', 'Consolas', 'monospace']
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'float': 'float 3s infinite ease-in-out'
      }
    },
  },
  plugins: [],
}
