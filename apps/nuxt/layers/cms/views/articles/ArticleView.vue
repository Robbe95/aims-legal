<script setup lang="ts">
import type { ClientArticleDetail } from '@repo/models'

import BlocksRenderer from '~cms/components/blocks/renderer/BlocksRenderer.vue'

interface Props {
  article: ClientArticleDetail
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4 bg-white">
    <BlocksRenderer
      v-if="article.blocks"
      :blocks="article.blocks"
    />
  </div>
</template>
