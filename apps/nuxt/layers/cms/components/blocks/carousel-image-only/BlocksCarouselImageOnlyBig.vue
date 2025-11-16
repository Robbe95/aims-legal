<script setup lang="ts">
import type {
  CarouselImageOnlyBlock,
  Image,
} from '@repo/payload-types'

import Carousel from '~base/components/carousel/Carousel.vue'
import CarouselContent from '~base/components/carousel/CarouselContent.vue'
import Section from '~base/components/section/Section.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import BlocksCarouselImageOnlyBigItem from '~cms/components/blocks/carousel-image-only/BlocksCarouselImageOnlyBigItem.vue'

interface Props {
  block: CarouselImageOnlyBlock
}

const props = defineProps<Props>()

const images = computed<Image[]>(() => {
  return props.block.image.filter((image): image is Image => {
    return typeof image === 'object' && 'id' in image && 'url' in image
  })
})
</script>

<template>
  <Section
    class="relative"
    no-padding
  >
    <div
      class="flex flex-col gap-10"
    >
      <div
        v-if="block.title"

        class="z-20 flex w-full flex-row items-end justify-between px-4"
      >
        <SectionHeader
          class="max-w-96 text-balance text-secondary"
        >
          {{ block.title }}
        </SectionHeader>
      </div>

      <Carousel
        :autoplay="true"
        :opts="{
          align: 'start',
          loop: true,
        }"
        class="mr-break-out relative"
      >
        <CarouselContent class="-ml-6 pl-8">
          <template
            v-for="(item, index) in images"
            :key="index ?? ''"
          >
            <BlocksCarouselImageOnlyBigItem
              :index="index"
              :item="item"
            />
          </template>
        </CarouselContent>
      </Carousel>
    </div>
  </Section>
</template>
