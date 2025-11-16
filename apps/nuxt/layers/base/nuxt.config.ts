import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  $production: {
    scripts: {
      registry: {
        // Set with ENV: NUXT_PUBLIC_SCRIPTS_GOOGLE_TAG_MANAGER_ID
        googleTagManager: {
          id: '',
        },
      },
    },
  },
  components: [],
  css: [
    '~base/assets/styles/index.css',
  ],
  experimental: {
    viewTransition: true,
  },

  fonts: {
    experimental: {
      processCSSVariables: true,
    },
    families: [
      {
        name: 'Geist',
        global: true,
        preload: true,
        provider: 'local',
        src: '/fonts/geist',
        styles: [
          'normal',
          'italic',
        ],
        weights: [
          100,
          200,
          300,
          400,
          500,
          600,
          700,
          800,
          900,
        ],
      },

    ],
  },
  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxt/scripts',
  ],
  runtimeConfig: {
    public: {
      authClientId: '',
      authOrganizationId: '',
      authProjectId: '',
      authBaseUrl: '',
      authIssuer: '',
      authJwksEndpoint: '',
      cmsBaseUrl: '',
      environment: '',
      siteBaseUrl: '',
      siteName: '',
    },
    redisDb: 0,
    redisHost: '',
    redisPassword: '',
    redisPort: 6379,
    redisUsername: '',
  },
  vite: {
    plugins: [
      tailwindcss() as any,
    ],
  },
})
