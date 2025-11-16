<script setup lang="ts">
import type { ClientNavigationLinkRelation } from '@repo/models'

import { NuxtLinkLocale } from '#components'
import { useInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'

interface Props {
  navLink: ClientNavigationLinkRelation
}
const props = defineProps<Props>()

const url = useInternalLink(props.navLink.link)
</script>

<template>
  <NuxtLinkLocale
    v-if="url"
    :to="(url as any)"
    class="
      flex items-center gap-2 duration-200
      hover:underline
      focus-visible:underline
    "
  >
    {{ props.navLink.label }}
  </NuxtLinkLocale>
</template>
