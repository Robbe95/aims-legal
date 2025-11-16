<script setup lang="ts">
import type { ClientLink } from '@repo/models'

import { NuxtLinkLocale } from '#components'
import { useInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'

const props = defineProps<{
  isLastHovered?: boolean
  label: string
  link: ClientLink
}>()

const url = useInternalLink(props.link)
</script>

<template>
  <NuxtLinkLocale
    v-if="url !== null"
    :to="(url as any)"
    :class="{
      'text-primary/40 hover:text-primary hover:underline': !props.isLastHovered,
      'text-primary underline': props.isLastHovered,
    }"
    active-class="underline text-primary"
    class="text-4xl duration-200"
  >
    {{ props.label }}
  </NuxtLinkLocale>
  <span
    v-else
    class="text-4xl text-error-500 duration-200"
  >{{ props.label }}</span>
</template>
