<script setup lang="ts">
import type { ImageTextBlock } from '@repo/payload-types'

import CallToAction from '~~/layers/cms/components/cta/CallToAction.vue'
import Section from '~base/components/section/Section.vue'
import SectionActions from '~base/components/section/SectionActions.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import SectionText from '~base/components/section/SectionText.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'
import LexicalSerializer from '~cms/components/lexical/LexicalSerializer.vue'

interface Props {
  block: ImageTextBlock
}
const props = defineProps<Props>()

const isReversed = computed<boolean>(() => {
  return props.block.variant === 'imageLeftSmall'
})
</script>

<template>
  <Section>
    <div
      :is-reversed="isReversed"
      class="
        grid items-end gap-12
        lg:grid-cols-2 lg:gap-72
      "
    >
      <CmsImage
        :image="block.image"
        :class="{
          'order-1': !isReversed,
        }"
        class="
          w-full rounded-sm object-cover
          lg:max-w-[470px]
        "
      />
      <div class="flex flex-col gap-6">
        <SectionHeader>
          {{ block.title }}
        </SectionHeader>
        <SectionText v-if="block.text">
          {{ block.text }}
        </SectionText>
        <LexicalSerializer
          v-if="block.richtext"
          :root="block.richtext.root"
        />
        <SectionActions class="mt-6">
          <CallToAction
            v-for="(cta, index) in block.ctas"
            :key="index"
            :cta="cta.cta"
            variant="secondary"
            class="text-sm"
          />
        </SectionActions>
        <slot name="actions" />
      </div>
    </div>
  </Section>
</template>
