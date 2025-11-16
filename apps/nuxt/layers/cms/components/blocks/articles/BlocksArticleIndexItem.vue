<script setup lang="ts">
import type {
  ClientArticleIndex,
  ClientLink,
} from '@repo/models'

import { useInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'
import SectionText from '~base/components/section/SectionText.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'
import CmsLink from '~cms/components/link/CmsLink.vue'

interface Props {
  article: ClientArticleIndex
  index: number
}

const props = defineProps<Props>()

const articleLink = computed<ClientLink>(() => {
  return {
    reference: {
      relationTo: 'articles',
      type: 'article',
      value: {
        id: props.article.id,
        slug: props.article.slug,
      },
    },
    type: 'reference',
  }
})

const isFourthItem = computed<boolean>(() => {
  return (props.index + 1) % 4 === 0
})

const link = useInternalLink(articleLink.value)
</script>

<template>
  <CmsLink
    :url="link"
    class="relative container flex h-full w-full flex-1 flex-col"
  >
    <CmsImage
      :image="article.preview.image"
      :class="{
        'aspect-square': !isFourthItem,
        'aspect-2/1': isFourthItem,
      }"
      class="w-full rounded-sm"
    />

    <div>
      <div
        class="
          flex w-full min-w-[300px] flex-col gap-6 rounded-tl-sm bg-white px-4
          py-6
        "
      >
        <div class="">
          <SectionText class="text-md">
            {{ article.preview.title }}
          </SectionText>
          <SectionText v-if="article.preview.description">
            {{ article.preview.description }}
          </SectionText>
        </div>
      </div>
    </div>
  </CmsLink>
</template>
