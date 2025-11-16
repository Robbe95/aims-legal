<script setup lang="ts">
import { computed } from 'vue'

import PageContext from '~~/layers/cms/components/page/PageContext.vue'
import { getEnv } from '~base/utils/env/getEnv.utils'
import { usePageQuery } from '~cms/api/page/query/usePage.query'
import { useLivePreview } from '~cms/composables/useLivePreview'
import NotFoundView from '~cms/views/general/NotFoundView.vue'
import PageView from '~cms/views/pages/PageView.vue'

const {
  CMS_BASE_URL,
} = getEnv()

const route = useRoute('page___en')
const pageName = computed<string>(() => route.params.page)
const pageQuery = usePageQuery({
  slug: pageName.value,
})

await pageQuery.suspense()

const {
  data,
} = useLivePreview({
  initialData: pageQuery.data,
})

const ogImage = computed<string>(() => {
  if (!data.value?.seo?.image) {
    return ''
  }

  if (typeof data.value.seo?.image === 'string') {
    return getImageUrl(data.value.seo?.image)
  }

  return getImageUrl(data.value.seo?.image.sizes?.card?.url ?? '')
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
    <PageContext
      v-if="data"
      :blocks="data.blocks ?? []"
    >
      <PageView
        :page="data"
      />
    </PageContext>
    <NotFoundView v-else />
  </div>
</template>
