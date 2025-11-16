<script setup lang="ts">
import type { RichTextBlock } from '@repo/payload-types'

import Section from '~base/components/section/Section.vue'
import LexicalSerializer from '~cms/components/lexical/LexicalSerializer.vue'

interface Props {
  block: RichTextBlock
}

defineProps<Props>()
</script>

<template>
  <Section>
    <div
      class="flex w-full flex-col items-center justify-center gap-6 text-center"
    >
      <LexicalSerializer :root="block.richtext.root" />
    </div>
  </Section>
</template>
