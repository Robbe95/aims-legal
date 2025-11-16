<script setup lang="ts">
import { computed } from 'vue'

import { NuxtErrorBoundary } from '#components'
import PageContext from '~~/layers/cms/components/page/PageContext.vue'
import { getEnv } from '~base/utils/env/getEnv.utils'
import { useGetArticleBySlug } from '~cms/api/article/query/useGetArticleBySlug.query'
import { useLivePreview } from '~cms/composables/useLivePreview'
import ArticleView from '~cms/views/articles/ArticleView.vue'
import NotFoundView from '~cms/views/general/NotFoundView.vue'

const {
  CMS_BASE_URL,
} = getEnv()

const route = useRoute('articles-slug___en')
const articleSlug = computed<string>(() => route.params.slug)

const articleQuery = useGetArticleBySlug({
  slug: articleSlug.value,
})

await articleQuery.suspense()

const {
  data,
} = useLivePreview({
  initialData: articleQuery.data,
})

const ogImage = computed<string>(() => {
  if (!data.value?.seo?.image) {
    return ''
  }

  if (typeof data.value.seo?.image === 'string') {
    return getImageUrl(data.value.seo?.image)
  }

  return getImageUrl(data.value.seo?.image?.sizes?.card?.url ?? '')
})

function getImageUrl(url: string): string {
  return `${CMS_BASE_URL}/${url}`
}

const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
})

useHead(() => ({
  htmlAttrs: {
    lang: head.value.htmlAttrs!.lang,
  },
  link: [
    {
      href: '/favicon.svg',
      rel: 'icon',
      type: 'image/png',
    },
  ],
}))

useSeoMeta({
  title: data.value?.seo?.title,
  description: data.value?.seo?.description,
  ogDescription: data.value?.seo?.description,
  ogImage: ogImage.value,
  ogTitle: data.value?.seo?.title,
  twitterCard: 'summary',
  twitterDescription: data.value?.seo?.description,
  twitterImage: ogImage.value,
  twitterTitle: data.value?.seo?.title,
})

definePageMeta({
  layout: 'empty-layout',
})
</script>

<template>
  <div
    class="
      w-full
      [--sub-header-height:3rem]
    "
  >
    <NuxtErrorBoundary>
      <PageContext
        v-if="data"
        :blocks="data.blocks ?? []"
      >
        <ArticleView :article="data" />
      </PageContext>
      <NotFoundView v-else />
      <template #fallback>
        <div class="flex size-full items-center justify-center">
          <div class="flex flex-col items-center justify-center" />
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
