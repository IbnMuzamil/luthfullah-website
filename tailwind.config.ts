import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0052FF',
          50: '#EBF2FF',
          100: '#D6E4FF',
          200: '#ADCAFF',
          300: '#85AFFF',
          400: '#5C95FF',
          500: '#0052FF',
          600: '#0041CC',
          700: '#003199',
          800: '#002166',
          900: '#001033',
        },
        secondary: '#F8FAFC',
        accent: '#00D1FF',
        brand: {
          deep: '#001B3D',
          sky: '#E0F2FE',
          electric: '#0052FF',
        },
        gold: '#F59E0B',
        'gold-foreground': '#FFFFFF',
        teal: '#0D9488',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'system-ui', 'sans-serif'],
      },
      animation: {
        gradient: 'gradient 3s ease infinite',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
