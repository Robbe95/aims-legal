<script setup lang="ts">
import type { ColumnTextCtaBlock } from '@repo/payload-types'

import CallToAction from '~~/layers/cms/components/cta/CallToAction.vue'
import Section from '~base/components/section/Section.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import SectionText from '~base/components/section/SectionText.vue'

interface Props {
  block: ColumnTextCtaBlock
}

defineProps<Props>()
</script>

<template>
  <Section>
    <div class="flex flex-col gap-6">
      <SectionHeader class="max-w-[640px] text-pretty">
        {{ block.title }}
      </SectionHeader>
      <SectionText class="max-w-[640px]">
        {{ block.text }}
      </SectionText>
      <div>
        <CallToAction
          v-for="(cta, index) in block.ctas"
          :key="index"
          :cta="cta.cta"
          variant="primary"
        />
      </div>
    </div>
  </Section>
</template>
