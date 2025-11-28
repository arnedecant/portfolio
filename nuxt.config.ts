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
      sqliteConnector: 'better-sqlite3'
    }
  },

  studio: {
    // route: '/studio',
    repository: {
      provider: 'github',
      owner: 'arnedecant',
      repo: 'portfolio',
      branch: 'main',
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      ignore: ['/studio', '/studio/**', '/_studio', '/_studio/**', '/_nuxt_studio', '/_nuxt_studio/**']
    },
    rollupConfig: {
      external: ['better-sqlite3']
    },
    // Prevent Nitro from replacing these env vars during build
    // They will be accessed at runtime from process.env
    replace: {
      // Keep these as process.env references instead of inlining values
      'process.env.STUDIO_GITHUB_CLIENT_ID': 'process.env.STUDIO_GITHUB_CLIENT_ID',
      'process.env.STUDIO_GITHUB_CLIENT_SECRET': 'process.env.STUDIO_GITHUB_CLIENT_SECRET',
    },
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