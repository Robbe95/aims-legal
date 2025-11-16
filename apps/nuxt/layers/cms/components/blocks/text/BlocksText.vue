<script setup lang="ts">
import type { TextBlock } from '@repo/payload-types'

import Section from '~base/components/section/Section.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import SectionText from '~base/components/section/SectionText.vue'
import LexicalSerializer from '~cms/components/lexical/LexicalSerializer.vue'

interface Props {
  isFirstBlock?: boolean
  block: TextBlock
}

defineProps<Props>()
</script>

<template>
  <Section :is-first-block>
    <div class="flex flex-col items-center justify-center gap-6 text-center">
      <SectionHeader class="max-w-[640px] text-pretty">
        {{ block.title }}
      </SectionHeader>

      <SectionText
        v-if="block.text"
        class="max-w-[640px] font-light"
      >
        {{ block.text }}
      </SectionText>
      <LexicalSerializer
        v-if="block.richtext"
        :root="block.richtext.root"
      />
    </div>
  </Section>
</template>
