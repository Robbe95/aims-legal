<script setup lang="ts">
import type { ColumnMultipleTextBlock } from '@repo/payload-types'

import CallToAction from '~~/layers/cms/components/cta/CallToAction.vue'
import Section from '~base/components/section/Section.vue'
import SectionSubHeader from '~base/components/section/SectionSubHeader.vue'
import SectionText from '~base/components/section/SectionText.vue'

interface Props {
  block: ColumnMultipleTextBlock
}

defineProps<Props>()
</script>

<template>
  <Section>
    <div class="flex flex-col gap-6">
      <div
        v-for="(text, index) in block.texts"
        :key="index"
        class="max-w-[640px]"
      >
        <SectionSubHeader>
          {{ text.subtitle }}
        </SectionSubHeader>

        <SectionText>
          {{ text.text }}
        </SectionText>
      </div>

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
