import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  shortcuts: {
    'app-card':
      'rounded-4xl bg-white/96 px-4 py-4 shadow-card backdrop-blur dark:bg-slate-900/92',
    'app-title': 'text-lg font-semibold text-text-primary',
    'app-subtitle': 'text-sm leading-6 text-text-secondary',
    'safe-bottom': 'pb-[calc(env(safe-area-inset-bottom)+16px)]',
  },
  theme: {
    colors: {
      brand: {
        DEFAULT: 'rgb(var(--brand-primary) / <alpha-value>)',
        soft: 'rgb(var(--brand-soft) / <alpha-value>)',
        dark: 'rgb(var(--brand-dark) / <alpha-value>)',
      },
      accent: 'rgb(var(--brand-accent) / <alpha-value>)',
      muted: 'rgb(var(--text-secondary) / <alpha-value>)',
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
  transformers: [transformerDirectives()],
})
