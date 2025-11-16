<script setup lang="ts">
import type {
  CarouselImageOnlyBlock,
  Image,
} from '@repo/payload-types'

import Carousel from '~base/components//carousel/Carousel.vue'
import CarouselContent from '~base/components//carousel/CarouselContent.vue'
import CarouselItem from '~base/components//carousel/CarouselItem.vue'
import Section from '~base/components//section/Section.vue'
import SectionHeader from '~base/components//section/SectionHeader.vue'
import BlocksCarouselImageOnlySmallItem from '~cms/components/blocks/carousel-image-only/BlocksCarouselImageOnlySmallItem.vue'

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
  <Section no-padding>
    <div
      class="flex flex-col gap-10"
    >
      <div
        v-if="block.title"
        class="flex w-full items-center justify-center px-4"
      >
        <SectionHeader class="max-w-96 text-center text-balance">
          {{ block.title }}
        </SectionHeader>
      </div>

      <Carousel
        :autoplay="true"
        :opts="{
          align: 'start',
          loop: true,
        }"
        class="mr-break-out pl-4"
      >
        <CarouselContent class="-ml-2">
          <CarouselItem
            v-for="(item, index) in images"
            :key="item.id ?? ''"
            :index="index"
            class="pl-2"
          >
            <div class="flex flex-1 flex-col p-2">
              <BlocksCarouselImageOnlySmallItem :item="item" />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </Section>
</template>
