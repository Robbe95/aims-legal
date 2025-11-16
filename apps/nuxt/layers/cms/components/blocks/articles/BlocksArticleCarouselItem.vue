<script setup lang="ts">
import type { Article } from 'nuxt-schema-org/schema'

import CarouselItem from '~base/components/carousel/CarouselItem.vue'
import SectionText from '~base/components/section/SectionText.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'

interface Props {
  article: Article
  index: number
}

defineProps<Props>()
</script>

<template>
  <CarouselItem
    :index="index"
    class="
      group min-w-0 shrink-0 grow-0 basis-full pl-6
      md:basis-1/2
      xl:basis-1/3
    "
  >
    <div
      class="relative container flex h-full w-full flex-1 flex-col"
    >
      <CmsImage
        :image="article.preview.image"
        class="aspect-square w-full rounded-sm"
      />

      <div>
        <div
          class="
            flex w-full min-w-[300px] flex-col gap-6 rounded-tl-sm bg-primary
            px-4 py-6
          "
        >
          <div class="">
            <SectionText class="text-md">
              {{ article.preview.title }}
            </SectionText>
            <SectionText>
              {{ article.preview.description }}
            </SectionText>
          </div>
        </div>
      </div>
    </div>
  </CarouselItem>
</template>
