<script setup lang="ts">
import type { CtaField } from '@repo/payload-types'

import CallToAction from '~~/layers/cms/components/cta/CallToAction.vue'

interface Props {
  cta: CtaField
}

defineProps<Props>()
</script>

<template>
  <CallToAction
    :cta="cta"
    class="
      font-light text-brand-500/60 duration-200
      hover:text-brand-500 hover:underline
    "
  />
</template>
