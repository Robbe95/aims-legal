<script lang="ts" setup>
// app.vue
import {
  defineLocalBusiness,
  useSchemaOrg,
} from '#imports'

useSchemaOrg([
  defineLocalBusiness({
    'name': 'Example',
    '@type': 'HomeAndConstructionBusiness',
    'address': {
      addressCountry: 'Belgium',
      addressLocality: 'Example City',
      addressRegion: 'Example Region',
      postalCode: '1234',
      streetAddress: '123 Example Street',
    },
    'logo': '/favicon.svg',
    'url': 'https://www.example.com',
  }),
])
</script>

<template>
  <slot />
</template>
