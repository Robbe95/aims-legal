<script setup lang="ts">
import type { ImageTextBlock } from '@repo/payload-types'

import Section from '~base/components/section/Section.vue'
import SectionActions from '~base/components/section/SectionActions.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import SectionText from '~base/components/section/SectionText.vue'
import SectionUnevenGrid from '~base/components/section/SectionUnevenGrid.vue'
import CallToAction from '~cms/components/cta/CallToAction.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'
import LexicalSerializer from '~cms/components/lexical/LexicalSerializer.vue'

interface Props {
  block: ImageTextBlock
}

defineProps<Props>()
</script>

<template>
  <Section>
    <SectionUnevenGrid class="items-end justify-end">
      <div class="flex flex-col gap-12">
        <SectionHeader>
          {{ block.title }}
        </SectionHeader>
        <CmsImage
          :image="block.image"
          class="w-full object-cover"
        />
      </div>
      <div class="flex flex-col items-end justify-end">
        <div
          class="
            flex flex-col gap-12
            lg:max-w-72
          "
        >
          <SectionText v-if="block.text">
            {{ block.text }}
          </SectionText>
          <LexicalSerializer
            v-if="block.richtext"
            :root="block.richtext.root"
          />
          <SectionActions>
            <CallToAction
              v-for="(cta, index) in block.ctas"
              :key="index"
              :cta="cta.cta"
              variant="secondary"
              class="text-sm"
            />
          </SectionActions>
        </div>
      </div>
    </SectionUnevenGrid>
  </Section>
</template>
