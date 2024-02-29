// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  ui: {
    icons: ['heroicons', 'mynaui']
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en',
        class: 'h-full'
      },
      bodyAttrs: {
        class: 'antialiased bg-white-50 dark:bg-slate-800 min-h-screen'
      }
    }
  },
  googleFonts: {
    display: 'swap',
    families: {
      Nunito: [400, 500, 600, 700, 800, 900]
    }
  }
})
