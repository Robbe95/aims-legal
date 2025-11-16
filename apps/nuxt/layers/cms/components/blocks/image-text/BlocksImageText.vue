<script setup lang="ts">
import type { ImageTextBlock } from '@repo/payload-types'

import BlocksImageTextBig from '~cms/components/blocks/image-text/BlocksImageTextBig.vue'
import BlocksImageTextFull from '~cms/components/blocks/image-text/BlocksImageTextFull.vue'
import BlocksImageTextSmall from '~cms/components/blocks/image-text/BlocksImageTextSmall.vue'

interface Props {
  block: ImageTextBlock
}
const props = defineProps<Props>()

const SMALL_VARIANTS = new Set([
  'imageLeftSmall',
  'imageRightSmall',
])

const BIG_VARIANTS = new Set([
  'imageLeftBig',
])

const FULL_VARIANTS = new Set([
  'fullImage',
])

const variantToRender = computed<'big' | 'full' | 'small'>(() => {
  if (SMALL_VARIANTS.has(props.block.variant)) {
    return 'small'
  }

  if (BIG_VARIANTS.has(props.block.variant)) {
    return 'big'
  }

  if (FULL_VARIANTS.has(props.block.variant)) {
    return 'full'
  }

  return 'small'
})
</script>

<template>
  <div class="first:mt-80">
    <BlocksImageTextSmall
      v-if="variantToRender === 'small'"
      :block="block"
    />
    <BlocksImageTextBig
      v-else-if="variantToRender === 'big'"
      :block="block"
    />
    <BlocksImageTextFull
      v-else-if="variantToRender === 'full'"
      :block="block"
    />
  </div>
</template>
