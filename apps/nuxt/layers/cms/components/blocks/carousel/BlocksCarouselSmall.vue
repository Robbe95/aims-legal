<script setup lang="ts">
import type { CarouselBlock } from '@repo/payload-types'

import CallToAction from '~~/layers/cms/components/cta/CallToAction.vue'
import Carousel from '~base/components/carousel/Carousel.vue'
import CarouselContent from '~base/components/carousel/CarouselContent.vue'
import CarouselItem from '~base/components/carousel/CarouselItem.vue'
import Section from '~base/components/section/Section.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import BlocksCarouselSmallItem from '~cms/components/blocks/carousel/BlocksCarouselSmallItem.vue'

interface Props {
  block: CarouselBlock
}

defineProps<Props>()
</script>

<template>
  <Section no-padding>
    <div
      class="flex flex-col gap-10"
    >
      <div
        v-if="block.title"
        class="grid w-full grid-cols-3 px-4"
      >
        <div />
        <div class="flex w-full items-center justify-center">
          <SectionHeader class="max-w-96 text-center text-balance">
            {{ block.title }}
          </SectionHeader>
        </div>

        <div class="flex w-full items-center justify-end">
          <CallToAction
            v-if="block.cta"
            :cta="block.cta"
            variant="secondary"
          />
        </div>
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
            v-for="(item, index) in block.items"
            :key="item.id ?? ''"
            :index="index"
            class="pl-2"
          >
            <div class="flex flex-1 flex-col p-2">
              <BlocksCarouselSmallItem
                :item="item"
                :items="block.items"
                :index="index"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </Section>
</template>
