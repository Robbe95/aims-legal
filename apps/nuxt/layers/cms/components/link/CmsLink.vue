<script setup lang="ts">
import { NuxtLinkLocale } from '#components'
import type { InternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'

interface Props {
  toNewTab?: boolean
  url: InternalLink | null
}
const props = defineProps<Props>()
</script>

<template>
  <NuxtLinkLocale
    v-if="props.url"
    :to="props.url"
    :target="props.toNewTab ? '_blank' : undefined"
  >
    <slot />
  </NuxtLinkLocale>
</template>
