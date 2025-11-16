<script setup lang="ts">
import type { CarouselBlock } from '@repo/payload-types'

import Carousel from '~base/components//carousel/Carousel.vue'
import CarouselContent from '~base/components//carousel/CarouselContent.vue'
import Section from '~base/components//section/Section.vue'
import SectionHeader from '~base/components//section/SectionHeader.vue'
import BlocksCarouselBigItem from '~cms/components/blocks/carousel/BlocksCarouselBigItem.vue'

interface Props {
  block: CarouselBlock
}

defineProps<Props>()
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
          class="text-balance text-secondary"
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
            v-for="(item, index) in block.items"
            :key="index ?? ''"
          >
            <BlocksCarouselBigItem
              :index="index"
              :item="item"
              :items="block.items"
            />
          </template>
        </CarouselContent>
      </Carousel>
    </div>
  </Section>
</template>
