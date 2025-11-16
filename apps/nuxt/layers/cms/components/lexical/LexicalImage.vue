<script setup lang="ts">
import CmsImage from '~cms/components/image/CmsImage.vue'
import type { LexicalUploadNode } from '~cms/models/lexical/lexicalUploadNode.model'

const props = defineProps<{
  format?: '' | 'center' | 'end' | 'justify' | 'left' | 'right' | 'start'
  node: LexicalUploadNode
}>()
</script>

<template>
  <div
    :class="{
      'items-center justify-center text-center': props.format === 'center',
      'items-end justify-end text-right': props.format === 'right'
        || props.format === 'end',
      'items-start justify-start text-left': props.format === 'left'
        || props.format === 'start',
    }"
    class="flex w-full flex-col"
  >
    <CmsImage
      :image="props.node.value"
      class="max-w-xl rounded-sm"
    />
  </div>
</template>
