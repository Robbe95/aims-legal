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
    '@wisemen/vue-core-components/style.css',
    '~base/assets/styles/base.css',
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
        name: 'Kreon',
        global: true,
        preload: true,
        provider: 'local',
        weights: [
          300,
          400,
          700,
        ],
      },
      {
        name: 'Logo',
        global: true,
        preload: true,
        provider: 'local',
        weights: [
          300,
          400,
          700,
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
