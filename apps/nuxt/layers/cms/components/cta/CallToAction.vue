<script setup lang="ts">
import type { CtaField } from '@repo/payload-types'

import CmsCtaLink from '~cms/components/link/CmsCtaLink.vue'

interface Props {
  cta: CtaField
  variant?: 'primary' | 'secondary'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
})
</script>

<template>
  <CmsCtaLink
    v-if="cta.ctaType === 'link' && cta.link"
    :link="cta.link"
    :label="cta.label"
    :variant="variant"
    :open-in-new-tab="cta.link.newTab"
  />
</template>
