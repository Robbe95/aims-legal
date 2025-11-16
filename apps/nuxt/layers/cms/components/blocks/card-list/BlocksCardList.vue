<script setup lang="ts">
import type { CardListBlock } from '@repo/payload-types'

import CallToAction from '~~/layers/cms/components/cta/CallToAction.vue'
import Section from '~base/components/section/Section.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import Seperator from '~base/components/seperator/Seperator.vue'
import BlocksCardListCard from '~cms/components/blocks/card-list/BlocksCardListCard.vue'

interface Props {
  block: CardListBlock
}

defineProps<Props>()
</script>

<template>
  <Section
    class="
      bg-white text-black
      first:mt-40
    "
  >
    <div class="flex flex-col gap-12">
      <div
        v-if="block.title"
        class="flex flex-col gap-4"
      >
        <div class="flex items-end justify-between">
          <SectionHeader class="lowercase">
            {{ block.title }}
          </SectionHeader>
          <CallToAction
            v-if="block.cta"
            :cta="block.cta"
            variant="secondary"
          />
        </div>

        <Seperator class="bg-black" />
      </div>
      <div
        class="
          grid grid-cols-1 gap-x-8 gap-y-12
          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        <BlocksCardListCard
          v-for="card in block.cards"
          :key="card.id ?? ''"
          :item="card"
        />
      </div>
    </div>
  </Section>
</template>
