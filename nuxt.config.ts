// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  css: [
    '@/assets/styles/main.scss',
  ],

  vite: {
    resolve: {
      alias: {
        '@': new URL('./', import.meta.url).pathname,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:math";`,
        },
      },
    },
  },

  content: {
    experimental: {
      nativeSqlite: true
    }
  },

  studio: {
    route: '/studio',
    repository: {
      provider: 'github',
      owner: 'arnedecant',
      repo: 'portfolio',
      branch: 'main',
    },
  },

  nitro: {
    prerender: {
      // Pre-render the homepage
      routes: ['/'],
      // Then crawl all the links on the page
      crawlLinks: true
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-studio'
  ],
})