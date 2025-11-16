<script setup lang="ts">
import type { ClientNavigationLinkRelation } from '@repo/models'
import { VcIcon } from '@wisemen/vue-core-components'

import { NuxtLinkLocale } from '#components'
import { useInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'

interface Props {
  hasArrow?: boolean
  navLink: ClientNavigationLinkRelation
  variant?: 'seeThrough' | 'white'
}
const props = withDefaults(defineProps<Props>(), {
  hasArrow: false,
  variant: 'white',
})

const toNewTab = computed<boolean>(() => {
  if (props.navLink.link.type !== 'custom') {
    return false
  }

  return props.navLink.link.toNewTab
})

const url = useInternalLink(props.navLink.link)
</script>

<template>
  <NuxtLinkLocale
    v-if="url !== null"
    :to="(url as any)"
    :target="toNewTab ? '_blank' : undefined"
    :class="{
      'text-black hover:text-black': props.variant === 'white',
      'text-white hover:text-white': props.variant === 'seeThrough',
    }"
    class="
      flex items-center gap-2 text-nowrap duration-200
      hover:underline
    "
  >
    {{ props.navLink.label }}
    <VcIcon
      v-if="props.hasArrow"
      icon="arrowRight"
      class="size-3 duration-200"
    />
  </NuxtLinkLocale>
  <span
    v-else
    class="text-error-500"
  >
    {{ props.navLink.label }}
  </span>
</template>
