<script setup lang="ts">
import type { DoubleImageBlock } from '@repo/payload-types'

import Section from '~base/components/section/Section.vue'
import SectionUnevenGrid from '~base/components/section/SectionUnevenGrid.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'

interface Props {
  block: DoubleImageBlock
}
const props = defineProps<Props>()
</script>

<template>
  <Section>
    <SectionUnevenGrid>
      <CmsImage
        :image="props.block.firstImage"
        class="h-[480px] w-full rounded-sm"
      />
      <CmsImage
        :image="props.block.secondImage"
        class="h-[480px] w-full rounded-sm"
      />
    </SectionUnevenGrid>
  </Section>
</template>
