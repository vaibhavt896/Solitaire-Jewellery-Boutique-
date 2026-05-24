import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1440px' },
    },
    extend: {
      colors: {
        ink: { DEFAULT: '#1A1410', soft: '#4A4036', muted: '#7A6E60' },
        bone: { DEFAULT: '#FBF7EE', deep: '#F4EEDF' },
        paper: '#FFFFFF',
        gold: {
          DEFAULT: '#A8841C',
          deep: '#7A5F0E',
          soft: '#C9A84C',
          veil: '#F2EAD0',
        },
        rose: { DEFAULT: '#C68B7E', soft: '#F5E2DC' },
        emerald: { DEFAULT: '#2C5A3F' },
        ruby: { DEFAULT: '#7A1818' },
        line: '#D8CDB2',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Garamond', 'Times New Roman', 'serif'],
        body: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        mega: ['clamp(3rem, 8vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        display: ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h1: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        h2: ['1.5rem', { lineHeight: '1.2' }],
        h3: ['1.25rem', { lineHeight: '1.3' }],
        h4: ['1.125rem', { lineHeight: '1.35' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        micro: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.14em' }],
      },
      letterSpacing: {
        eyebrow: '0.14em',
        button: '0.06em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '38': '9.5rem',
        '46': '11.5rem',
        '54': '13.5rem',
      },
      maxWidth: {
        narrow: '640px',
        content: '880px',
        default: '1280px',
        wide: '1440px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
