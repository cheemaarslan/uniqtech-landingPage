// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'UniqTech × SmartGen | Smart city infrastructure',
      meta: [
        { name: 'description', content: 'UniqTech Global Solutions and SmartGen Technologies deliver intelligent transport, smart energy, smart waste, fleet management and software solutions.' },
        { name: 'theme-color', content: '#132B47' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logos/uniqtech.png' },
        { rel: 'preload', as: 'image', type: 'image/webp', href: '/images/hero-smart-city.webp', fetchpriority: 'high' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      // Web3Forms access key for the contact form. Submissions are emailed to the inbox the key was
      // created with (info@uniqtech.om). It is meant to be public. Override with NUXT_PUBLIC_WEB3FORMS_KEY.
      web3formsKey: '9291ab3a-c377-4109-9cbe-2e54d1db8970'
    }
  },

  // Light-only site, like SmartGenTech.
  ui: { colorMode: false },

  // Self-hosted fonts (via @nuxt/fonts, bundled with Nuxt UI), picked up from main.css.
  fonts: {
    defaults: { weights: [400, 500, 600, 700] }
  },

  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800' } }
  },

  compatibilityDate: '2026-06-30'
})
