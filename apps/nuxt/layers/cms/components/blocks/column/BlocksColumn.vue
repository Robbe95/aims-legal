<script setup lang="ts">
import type { ColumnBlock } from '@repo/payload-types'

import Section from '~base/components/section/Section.vue'
import BlocksColumnRenderer from '~cms/components/blocks/column/BlocksColumnRenderer.vue'
import type { SingleColumnBlock } from '~cms/types/blocks.type'

interface Props {
  block: ColumnBlock
}

const props = defineProps<Props>()

const firstColumn = computed<SingleColumnBlock | null>(() => props.block.columns?.[0]?.block?.[0] ?? null)
const secondColumn = computed<SingleColumnBlock | null>(() => props.block.columns?.[1]?.block?.[0] ?? null)
</script>

<template>
  <Section>
    <div class="container">
      <div
        class="
          grid gap-20
          lg:grid-cols-2
        "
      >
        <div>
          <BlocksColumnRenderer
            v-if="firstColumn"
            :block="firstColumn"
          />
        </div>
        <div>
          <BlocksColumnRenderer
            v-if="secondColumn"
            :block="secondColumn"
          />
        </div>
      </div>
    </div>
  </Section>
</template>
