<script setup lang="ts">
import type { ClientLink } from '@repo/models'
import { VcIcon } from '@wisemen/vue-core-components'

import { NuxtLinkLocale } from '#components'
import { useInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'

const props = defineProps<{
  label: string
  link: ClientLink
}>()

const url = useInternalLink(props.link)
</script>

<template>
  <NuxtLinkLocale
    v-if="url !== null"
    :to="(url as any)"
    active-class="underline text-primary"
    class="
      flex w-80 items-center justify-between
      hover:text-primary hover:underline
    "
  >
    {{ props.label }}
    <VcIcon
      icon="arrowRight"
      class="ml-1 inline-block size-3"
    />
  </NuxtLinkLocale>
  <span
    v-else
    class="
      flex w-80 items-center justify-between text-error-500
      hover:underline
    "
  >{{ props.label }}</span>
</template>
