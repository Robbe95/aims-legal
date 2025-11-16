<script setup lang="ts">
import type { Image } from '@repo/payload-types'
import { defineProps } from 'vue'

import CarouselItem from '~base/components//carousel/CarouselItem.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'

interface Props {
  index: number
  item: Image
}

defineProps<Props>()
</script>

<template>
  <CarouselItem
    :index="index"
    class="group container w-full min-w-0 shrink-0 grow-0 pl-4"
  >
    <div
      class="
        relative flex h-[800px] w-full flex-1 flex-col overflow-hidden
        rounded-sm
      "
    >
      <CmsImage
        :image="item"
        class="h-full w-full rounded-sm"
      />

      <div
        class="
          pointer-events-none absolute inset-0 rounded-sm bg-white/40
          duration-200
          group-data-[state=active]:opacity-0
        "
      />
    </div>
  </CarouselItem>
</template>
