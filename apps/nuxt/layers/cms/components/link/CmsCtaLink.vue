<script setup lang="ts">
import type { Locale } from '@repo/constants'
import type { ClientLink } from '@repo/models'
import type { CtaField } from '@repo/payload-types'
import { tv } from 'tailwind-variants'

import { NuxtLinkLocale } from '#components'
import { useInternalLink } from '~cms/composables/link/useInternalLink.composable'

const props = withDefaults(defineProps<{
  label: string
  link: ClientLink | CtaField['link']
  locale?: Locale | null
  openInNewTab?: boolean
  variant?: 'primary' | 'secondary'

}>(), {
  locale: null,
  openInNewTab: false,
  variant: 'primary',
})

const url = useInternalLink(props.link)

const attrs = useAttrs()
const style = tv({
  base: '',
  variants: {
    variant: {
      primary: `
        text-white
        hover:text-white hover:underline
      `,
      secondary: `
        text-primary
        hover:text-primary hover:underline
      `,
    },
  },
})
</script>

<template>
  <NuxtLinkLocale
    v-if="url !== null"
    :to="(url as any)"
    :locale="props.locale ?? undefined"
    :target="openInNewTab ? '_blank' : undefined"
    :class="style({ variant,
                    class: attrs.class as string })"
  >
    {{ label }}
  </NuxtLinkLocale>
  <span
    v-else
    :class="style({ variant,
                    class: `${attrs.class} !text-error-500` })"
  >{{ label }}
  </span>
</template>
