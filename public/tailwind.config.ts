import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--brand-primary) / <alpha-value>)',
          soft: 'rgb(var(--brand-soft) / <alpha-value>)',
          dark: 'rgb(var(--brand-dark) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        },
      },
      boxShadow: {
        card: '0 12px 40px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        '4xl': '1.5rem',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top, rgba(18, 184, 134, 0.24), transparent 42%), linear-gradient(180deg, rgba(7, 16, 33, 0.96), rgba(3, 7, 18, 1))',
      },
    },
  },
  plugins: [],
}

export default config
