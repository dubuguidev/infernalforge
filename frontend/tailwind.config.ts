import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'Georgia', 'serif'],
        crimson: ['var(--font-crimson)', 'Georgia', 'serif'],
      },
      colors: {
        infernal: {
          black: '#0a0a0a',
          void: '#0f0f0f',
          'red-dark': '#7f1d1d',
          'red-deep': '#450a0a',
          'red-vivid': '#dc2626',
          ember: '#f97316',
          amber: '#f59e0b',
          ash: '#292524',
          smoke: '#1c1917',
        },
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.35), 0 0 60px rgba(220, 38, 38, 0.1)',
        'glow-red-lg': '0 0 40px rgba(220, 38, 38, 0.5), 0 0 100px rgba(220, 38, 38, 0.15)',
        'glow-ember': '0 0 20px rgba(249, 115, 22, 0.35)',
        'card': '0 4px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.9), 0 0 0 1px rgba(220,38,38,0.25)',
      },
      backgroundImage: {
        'infernal-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #0f0000 50%, #0a0a0a 100%)',
        'card-gradient': 'linear-gradient(180deg, #1a0505 0%, #0f0f0f 100%)',
        'stat-gradient': 'linear-gradient(90deg, #7f1d1d, #dc2626, #f97316)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(220,38,38,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(220,38,38,0.6), 0 0 60px rgba(220,38,38,0.2)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
