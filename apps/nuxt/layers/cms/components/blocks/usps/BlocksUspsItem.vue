<script setup lang="ts">
import type { UspsBlock } from '@repo/payload-types'

import SectionSubHeader from '~base/components/section/SectionSubHeader.vue'
import SectionText from '~base/components/section/SectionText.vue'

interface Props {
  usp: UspsBlock['usps'][number]
  variant: 'gray' | 'white'
}

defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'border-transparent bg-gray-500': variant === 'gray',
      'border-gray-500 bg-primary': variant === 'white',
    }"
    class="group flex h-full flex-col gap-6 rounded-xs border p-4"
  >
    <div>
      <SectionSubHeader
        v-if="usp.title"
        class="text-md"
      >
        {{ usp.title }}
      </SectionSubHeader>
      <SectionText
        v-if="usp.subtitle"
        class="text-md font-light lowercase"
      >
        {{ usp.subtitle }}
      </SectionText>
    </div>

    <SectionText
      v-if="usp.description"
      class="text-sm"
    >
      {{ usp.description }}
    </SectionText>
  </div>
</template>
