<script lang="ts" setup>
// app.vue
import {
  defineLocalBusiness,
  useSchemaOrg,
} from '#imports'

const config = useRuntimeConfig()
const siteName = config.public.siteName

useSchemaOrg([
  defineLocalBusiness({
    'name': siteName === 'vektron' ? 'Vektron' : 'Kreon',
    '@type': 'HomeAndConstructionBusiness',
    'address': {
      addressCountry: 'Belgium',
      addressLocality: 'Oudsbergen',
      addressRegion: 'Flanders',
      postalCode: '3660',
      streetAddress: 'Industrieweg Noord 1152',
    },
    'logo': '/favicon.svg',
    'url': siteName === 'vektron' ? 'https://vektron.com' : 'https://kreon.com',
  }),
])
</script>

<template>
  <slot />
</template>
