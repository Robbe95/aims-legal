import path from 'node:path'

export default defineNuxtConfig({
  alias: {
    '~base': path.resolve(__dirname, '../base'),
  },
  app: {
    head: {
      link: [

        {
          href: '/favicon.ico',
          rel: 'icon',
          type: 'image/ico',
        },
        {
          href: '/favicon.svg',
          rel: 'icon',
          type: 'image/svg+xml',
        },
        {
          href: '/favicon-96x96.png',
          rel: 'icon',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          href: '/apple-touch-icon.png',
          rel: 'apple-touch-icon',
          sizes: '180x180',
        },
        {
          href: '/site.webmanifest',
          rel: 'manifest',
        },
      ],
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          id: 'description',
          name: 'description',
          content: '',
        },
        {
          name: 'google-site-verification',
          content: 'OStb16cI4Asnm5ycGcO1iuR_6JHxtv11Uiw5FnF31X0',
        },

      ],
    },
  },

  extends: [
    '../base',
  ],
  modules: [
    '@nuxtjs/seo',
  ],
  ogImage: {
    enabled: false,
  },
  routeRules: {
    '**': {
      cache: {
        name: 'redis',
        base: 'redis',
        maxAge: 60,
        swr: true,
      },
    },
  },

  sitemap: {
    debug: true,
    defaultSitemapsChunkSize: 2000,
    sitemaps: {
      'de-DE': {
        chunks: true,
        sources: [
          '/sitemapGenerate?locale=de',
        ],
      },
      'en-US': {
        chunks: true,
        sources: [
          '/sitemapGenerate?locale=en',
        ],
      },
      'es-ES': {
        chunks: true,
        sources: [
          '/sitemapGenerate?locale=es',
        ],
      },
      'fr-FR': {
        chunks: true,
        sources: [
          '/sitemapGenerate?locale=fr',
        ],
      },
      'it-IT': {
        chunks: true,
        sources: [
          '/sitemapGenerate?locale=it',
        ],
      },
      'nl-BE': {
        chunks: true, // Enable chunking with default size
        sources: [
          '/sitemapGenerate?locale=nl',
        ],
      },
    },
  },

})
