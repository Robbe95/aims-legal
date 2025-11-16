<script setup lang="ts">
import type { Page } from '@repo/payload-types'

import { NuxtErrorBoundary } from '#components'
import BlocksArticleCarousel from '~cms/components/blocks/articles/BlocksArticleCarousel.vue'
import BlocksArticleIndex from '~cms/components/blocks/articles/BlocksArticleIndex.vue'
import BlocksCardList from '~cms/components/blocks/card-list/BlocksCardList.vue'
import BlocksCarousel from '~cms/components/blocks/carousel/BlocksCarousel.vue'
import BlocksCarouselImageOnly from '~cms/components/blocks/carousel-image-only/BlocksCarouselImageOnly.vue'
import BlocksColumn from '~cms/components/blocks/column/BlocksColumn.vue'
import BlocksHero from '~cms/components/blocks/hero/BlocksHero.vue'
import BlocksHubspotForm from '~cms/components/blocks/hubspot/BlocksHubspotForm.vue'
import BlocksImageText from '~cms/components/blocks/image-text/BlocksImageText.vue'
import BlocksDoubleImage from '~cms/components/blocks/images/BlocksDoubleImage.vue'
import BlocksRendererError from '~cms/components/blocks/renderer/BlocksRendererError.vue'
import BlocksRendererNotSupported from '~cms/components/blocks/renderer/BlocksRendererNotSupported.vue'
import BlocksRichtext from '~cms/components/blocks/text/BlocksRichText.vue'
import BlocksText from '~cms/components/blocks/text/BlocksText.vue'
import BlocksUsps from '~cms/components/blocks/usps/BlocksUsps.vue'

interface Props {
  blocks: Page['blocks']
}

defineProps<Props>()

const blocksWrapper = useTemplateRef('blocksWrapper')

function isFirstBlock(index: number): boolean {
  return index === 0
}
</script>

<template>
  <div
    ref="blocksWrapper"
    class="flex flex-col"
  >
    <template
      v-for="(block, index) in blocks"
      :key="JSON.stringify(block)"
    >
      <NuxtErrorBoundary>
        <BlocksHero
          v-if="block.blockType === 'hero'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksColumn
          v-else-if="block.blockType === 'column'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksHubspotForm
          v-else-if="block.blockType === 'hubspot-form'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksCarousel
          v-else-if="block.blockType === 'carousel'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksImageText
          v-else-if="block.blockType === 'image-text'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksArticleCarousel
          v-else-if="block.blockType === 'articles-carousel'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksArticleIndex
          v-else-if="block.blockType === 'article-index'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksDoubleImage
          v-else-if="block.blockType === 'double-image'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksText
          v-else-if="block.blockType === 'text'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksUsps
          v-else-if="block.blockType === 'usps'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksCarouselImageOnly
          v-else-if="block.blockType === 'carousel-image-only'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksRichtext
          v-else-if="block.blockType === 'rich-text'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksCardList
          v-else-if="block.blockType === 'card-list'"
          :block="block"
          :is-first-block="isFirstBlock(index)"
        />
        <BlocksRendererNotSupported
          v-else
          :block-name="(block as any).blockType ?? 'Unknown'"
        />
        <template #error="{ error }">
          <BlocksRendererError :error="error" />
        </template>
      </NuxtErrorBoundary>
    </template>
  </div>
</template>
