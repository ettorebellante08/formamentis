import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tema chiaro moderno. Brand blu Forma Mentis come colore primario.
        background: '#F4F7FA',
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#FBFCFD',
          dark: '#EAEFF4',
        },
        primary: {
          DEFAULT: '#1890CC',
          50: '#E9F6FD',
          100: '#CDEAFA',
          200: '#9BD4F3',
          300: '#5FBAEC',
          400: '#2EA2DE',
          500: '#1890CC',
          600: '#127AB0',
          700: '#0F6492',
          800: '#0D4F73',
          900: '#0E3F5B',
        },
        accent: {
          DEFAULT: '#E11D38',
          dark: '#C8102E',
        },
        ink: {
          DEFAULT: '#11202B',
          muted: '#566976',
          dim: '#8AA0AD',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-dm-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'fm-gradient': 'linear-gradient(135deg, #3DBDF0 0%, #1890CC 50%, #0C6090 100%)',
        'fm-radial': 'radial-gradient(60% 60% at 50% 0%, rgba(24,144,204,0.16) 0%, rgba(244,247,250,0) 70%)',
        'grid-faint':
          'linear-gradient(rgba(24,144,204,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(24,144,204,0.07) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
      boxShadow: {
        soft: '0 16px 44px -24px rgba(17, 32, 43, 0.22)',
        card: '0 28px 64px -32px rgba(15, 100, 146, 0.42)',
        glow: '0 0 40px -8px rgba(24, 144, 204, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
