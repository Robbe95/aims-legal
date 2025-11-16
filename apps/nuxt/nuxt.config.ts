/* eslint-disable node/prefer-global/process */
import path from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2025-10-30',
  alias: {
    '@': path.resolve(__dirname, './disable'),
    '@@': path.resolve(__dirname, './disable'),
    '~base': path.resolve(__dirname, './layers/base'),
    '~cms': path.resolve(__dirname, './layers/cms'),
    '~root': path.resolve(__dirname, './'),

  },
  components: [],

  devtools: {
    enabled: true,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  experimental: {
    typedPages: true,
  },
  extends: [
    './layers/base',
    './layers/cms',
    './layers/seo',
  ],
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_NAME === 'vektron' ? 'https://vektron.com' : 'https://kreon.com',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      redirectOn: 'all',
    },
    experimental: {
      typedOptionsAndMessages: 'default',
      typedPages: true,
    },
    langDir: 'locales',
    locales: [
      {
        iso: 'en-US',
        code: 'en',
        file: 'en.json',
        language: 'en-US',
      },
      {
        iso: 'nl-BE',
        code: 'nl',
        file: 'nl.json',
        language: 'nl-BE',
      },
    ],
    strategy: 'prefix',
  },
  imports: {
    scan: false,
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/scripts',
  ],

  ssr: true,

  typescript: {
    tsConfig: {
      include: [
        '../**/*',
      ],
    },
  },
})
