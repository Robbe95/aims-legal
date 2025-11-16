<script setup lang="ts">
import { providePageContext } from '~~/layers/cms/composables/page/usePageContext.composable'
import type { ClientBlocks } from '~~/layers/cms/types/blocks.type'

interface Props {
  blocks: ClientBlocks
}
const props = defineProps<Props>()

providePageContext({
  blocks: props.blocks,
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
