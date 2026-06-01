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
        /* Core new palette */
        ivory:    { DEFAULT: '#F4EFE3', smoke: '#E8E0D0', raised: '#FBF7EE' },
        obsidian: '#1A1410',
        'aged-gold': '#BD9A45',
        mahogany: '#3A1F14',
        'emerald-w': '#2D4A3E',
        'ruby-w':    '#6B1F2A',
        stone: {
          100: '#FAF7EF',
          200: '#EDE5D3',
          400: '#B8AC92',
          600: '#6B6353',
          800: '#2D2820',
        },
        /* Legacy aliases — keep all components working */
        ink:  { DEFAULT: '#1A1410', soft: '#4A4036', muted: '#7A6E60' },
        bone: { DEFAULT: '#F4EFE3', deep: '#E8E0D0' },
        paper: '#FFFFFF',
        gold: {
          DEFAULT: '#BD9A45',
          light:   '#E4CA80',
          deep:    '#9A7A2E',
          soft:    '#CDB063',
          veil:    '#F2EAD0',
        },
        rose:    { DEFAULT: '#C68B7E', soft: '#F5E2DC' },
        emerald: { DEFAULT: '#2D4A3E' },
        ruby:    { DEFAULT: '#6B1F2A' },
        line:    '#E8E0D0',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Garamond', 'Times New Roman', 'serif'],
        body:    ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        mega:    ['clamp(3.2rem, 8vw, 7rem)',   { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        display: ['clamp(2.25rem, 5vw, 4.2rem)', { lineHeight: '1.04', letterSpacing: '-0.022em' }],
        h1:      ['clamp(1.8rem, 3vw, 2.6rem)',  { lineHeight: '1.1',  letterSpacing: '-0.018em' }],
        h2:      ['1.5rem',   { lineHeight: '1.2' }],
        h3:      ['1.25rem',  { lineHeight: '1.3' }],
        h4:      ['1.125rem', { lineHeight: '1.35' }],
        body:    ['1.0625rem', { lineHeight: '1.7' }],
        small:   ['0.875rem',  { lineHeight: '1.55' }],
        micro:   ['0.72rem',   { lineHeight: '1.4', letterSpacing: '0.16em' }],
      },
      letterSpacing: {
        eyebrow: '0.18em',
        button:  '0.08em',
        wide:    '0.22em',
      },
      spacing: {
        '18': '4.5rem', '22': '5.5rem', '30': '7.5rem',
        '38': '9.5rem', '46': '11.5rem', '54': '13.5rem',
      },
      maxWidth: {
        narrow:  '640px',
        content: '880px',
        default: '1280px',
        wide:    '1440px',
      },
      transitionTimingFunction: {
        /* The Solitaire editorial ease — slow, cinematic */
        editorial: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        luxury:    'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
      },
      keyframes: {
        marquee:         { '0%': { transform: 'translateX(0)' },    '100%': { transform: 'translateX(-50%)' } },
        'marquee-rev':   { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        'fade-up':       { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'word-in':       { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'ken-burns':     { '0%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)' } },
        'slide-up':      { '0%': { transform: 'translateY(6px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'line-draw':     { '0%': { transform: 'scaleX(0)' }, '100%': { transform: 'scaleX(1)' } },
      },
      animation: {
        marquee:      'marquee 40s linear infinite',
        'marquee-rev':'marquee-rev 52s linear infinite',
        'fade-up':    'fade-up 0.8s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'ken-burns':  'ken-burns 8s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        'line-draw':  'line-draw 1.2s cubic-bezier(0.25,0.46,0.45,0.94) both',
      },
    },
  },
  plugins: [],
};

export default config;
