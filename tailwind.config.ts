import type { Config } from 'tailwindcss'
// import defaultTheme from 'tailwindcss/defaultTheme'

// export default <Partial<Config>> {
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#f2fbfa',
          100: '#d3f4f1',
          200: '#a6e9e5',
          300: '#66d3d0',
          400: '#44bdbd',
          500: '#2b9fa1',
          600: '#207d81',
          700: '#1d6468',
          800: '#1c4f53',
          900: '#1b4346',
          950: '#0a2629'
        }
      }
    },
    fontFamily: {
      sans: [
        'Nunito',
        'Inter'
      ],
      mono: [
        'Cascadia Code',
        'ui-monospace'
      ]
    }
  },
  plugins: [require('@tailwindcss/typography')]
} satisfies Config
