<script setup lang="ts">
import type { UspsBlock } from '@repo/payload-types'

import Container from '~~/layers/base/components/container/Container.vue'
import Carousel from '~base/components/carousel/Carousel.vue'
import CarouselContent from '~base/components/carousel/CarouselContent.vue'
import CarouselItem from '~base/components/carousel/CarouselItem.vue'
import Section from '~base/components/section/Section.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import BlocksUspsItem from '~cms/components/blocks/usps/BlocksUspsItem.vue'

interface Props {
  block: UspsBlock
}

const props = defineProps<Props>()

const hasLessThanFiveItems = computed<boolean>(() => {
  return props.block.usps.length < 5
})
</script>

<template>
  <Section no-padding>
    <div
      class="flex flex-col gap-10"
    >
      <Container>
        <div
          v-if="block.title"
          class="flex w-full items-center justify-center px-4"
        >
          <SectionHeader class="max-w-96 text-center text-balance">
            {{ block.title }}
          </SectionHeader>
        </div>
      </Container>
      <Carousel
        v-if="!hasLessThanFiveItems"
        :autoplay="true"
        :opts="{
          align: 'start',
          loop: true,
        }"
        class="mr-break-out pl-4"
      >
        <CarouselContent class="-ml-2 flex">
          <CarouselItem
            v-for="(usp, index) in block.usps"
            :key="usp.id ?? ''"
            :index="index"
            class="flex w-[300px] shrink-0 pl-2"
          >
            <div class="flex h-full flex-1 flex-col">
              <BlocksUspsItem
                :usp="usp"
                :variant="block.variant"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <Container v-else>
        <div
          :class="{
            'gap-2 md:grid-cols-2 lg:grid-cols-4': block.usps.length === 4,
            'gap-2 md:grid-cols-2 lg:grid-cols-3': block.usps.length === 3,
            'gap-2 md:grid-cols-2': block.usps.length === 2,
            'gap-4': block.usps.length === 1,
          }"
          class="grid"
        >
          <div
            v-for="(usp, index) in block.usps"
            :key="usp.id ?? ''"
            :index="index"
          >
            <BlocksUspsItem
              :usp="usp"
              :variant="block.variant"
            />
          </div>
        </div>
      </Container>
    </div>
  </Section>
</template>
