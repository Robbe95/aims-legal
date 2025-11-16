<script setup lang="ts">
import type { ArticlesCarouselBlock } from '@repo/payload-types'

import { NuxtLinkLocale } from '#components'
import Carousel from '~base/components/carousel/Carousel.vue'
import CarouselContent from '~base/components/carousel/CarouselContent.vue'
import Section from '~base/components/section/Section.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import BlocksArticleCarouselItem from '~cms/components/blocks/articles/BlocksArticleCarouselItem.vue'

interface Props {
  block: ArticlesCarouselBlock
}

defineProps<Props>()

const {
  t,
} = useI18n()
</script>

<template>
  <Section
    class="relative mt-20 pt-36"
  >
    <div
      class="flex flex-col gap-20"
    >
      <div
        class="z-20 flex w-full flex-row items-end justify-between"
      >
        <SectionHeader class="max-w-96 text-balance text-secondary">
          {{ block.title }}
        </SectionHeader>
        <NuxtLinkLocale
          to="index"
          class="
            text-sm text-secondary
            hover:underline
            focus:underline
          "
        >
          {{ t('cms.all_articles') }}
        </NuxtLinkLocale>
      </div>

      <Carousel
        :autoplay="true"
        :opts="{
          align: 'start',
          loop: true,
        }"
        class="relative"
      >
        <CarouselContent class="-ml-6">
          <template
            v-for="(article, index) in block.articles"
            :key="index ?? ''"
          >
            <BlocksArticleCarouselItem
              v-if="(typeof article !== 'string')"
              :index="index"
              :article="article"
            />
          </template>
        </CarouselContent>
      </Carousel>
    </div>
  </Section>
</template>
