// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      // Title, description, Open Graph and structured data are set in app/app.vue (they need absolute URLs)
      meta: [
        { name: 'theme-color', content: '#132B47' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon.png' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preload', as: 'image', type: 'image/webp', href: '/images/hero-smart-city.webp', fetchpriority: 'high' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      web3formsKey: '9291ab3a-c377-4109-9cbe-2e54d1db8970',
      // Live site address for canonical and share links, e.g. https://uniqtech.om (no trailing slash).
      // Set NUXT_PUBLIC_SITE_URL in Cloudflare. If empty, the address of the incoming request is used.
      siteUrl: ''
    }
  },

  ui: { colorMode: false },

  fonts: {
    defaults: { weights: [400, 500, 600, 700] }
  },

  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800' } }
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  compatibilityDate: '2026-06-30'
})
