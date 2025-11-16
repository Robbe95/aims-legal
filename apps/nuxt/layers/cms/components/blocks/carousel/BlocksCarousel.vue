<script setup lang="ts">
import type { CarouselBlock } from '@repo/payload-types'

import BlocksCarouselBig from '~cms/components/blocks/carousel/BlocksCarouselBig.vue'
import BlocksCarouselSmall from '~cms/components/blocks/carousel/BlocksCarouselSmall.vue'

interface Props {
  block: CarouselBlock
}

defineProps<Props>()
</script>

<template>
  <BlocksCarouselSmall
    v-if="block.variant === 'small'"
    :block="block"
  />

  <BlocksCarouselBig
    v-if="block.variant === 'big'"
    :block="block"
  />
</template>
