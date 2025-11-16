<script setup lang="ts">
import type { HeroBlock } from '@repo/payload-types'

import BlocksHeroFullScreen from '~cms/components/blocks/hero/BlocksHeroFullScreen.vue'
import BlocksHeroPartialScreen from '~cms/components/blocks/hero/BlocksHeroPartialScreen.vue'

interface Props {
  block: HeroBlock
}

defineProps<Props>()
</script>

<template>
  <BlocksHeroFullScreen
    v-if="block.variant === 'fullScreen'"
    :block="block"
  />
  <BlocksHeroPartialScreen
    v-else-if="block.variant === 'partialScreen'"
    :block="block"
  />
</template>
