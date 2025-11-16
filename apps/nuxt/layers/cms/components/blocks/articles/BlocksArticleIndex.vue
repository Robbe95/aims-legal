<script setup lang="ts">
import type { ClientArticleIndex } from '@repo/models'
import type { ArticlesIndexBlock } from '@repo/payload-types'
import { VcButton } from '@wisemen/vue-core-components'

import UnevenGrid from '~base/components/grid/UnevenGrid.vue'
import UnevenGridItem from '~base/components/grid/UnevenGridItem.vue'
import Section from '~base/components/section/Section.vue'
import { useGetArticleIndexQuery } from '~cms/api/article/query/useGetArticleIndex.query'
import BlocksArticleIndexItem from '~cms/components/blocks/articles/BlocksArticleIndexItem.vue'

interface Props {
  block: ArticlesIndexBlock
}

defineProps<Props>()

const {
  t,
} = useI18n()
const articlesQuery = useGetArticleIndexQuery()

const articles = computed<ClientArticleIndex[]>(() => {
  return articlesQuery.data.value?.pages.flatMap((page) => page.docs) ?? []
})

function onLoadMore(): void {
  articlesQuery.fetchNextPage()
}
</script>

<template>
  <Section>
    <div class="mt-36">
      <h1 class="mb-12 text-hero">
        {{ block.title }}
      </h1>
      <UnevenGrid>
        <UnevenGridItem
          v-for="(article, index) in articles"
          :key="article.id"
          :index="index"
        >
          <BlocksArticleIndexItem
            :index="index"
            :article="article"
          />
        </UnevenGridItem>
      </UnevenGrid>
      <div class="flex items-center justify-center">
        <VcButton
          v-if="articlesQuery.hasNextPage.value"
          class="mt-20"
          @click="onLoadMore"
        >
          {{ t('base.shared.load_more') }}
        </VcButton>
      </div>
    </div>
  </Section>
</template>
