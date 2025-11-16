<script setup lang="ts">
import type { CarouselImageOnlyBlock } from '@repo/payload-types'

import BlocksCarouselImageOnlyBig from '~cms/components/blocks/carousel-image-only/BlocksCarouselImageOnlyBig.vue'
import BlocksCarouselImageOnlySmall from '~cms/components/blocks/carousel-image-only/BlocksCarouselImageOnlySmall.vue'

interface Props {
  block: CarouselImageOnlyBlock
}

defineProps<Props>()
</script>

<template>
  <BlocksCarouselImageOnlySmall
    v-if="block.variant === 'small'"
    :block="block"
  />

  <BlocksCarouselImageOnlyBig
    v-if="block.variant === 'big'"
    :block="block"
  />
</template>
