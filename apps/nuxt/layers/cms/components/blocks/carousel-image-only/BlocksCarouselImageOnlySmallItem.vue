<script setup lang="ts">
import type { Image } from '@repo/payload-types'

import CmsImage from '~cms/components/image/CmsImage.vue'

interface Props {
  item: Image
}

defineProps<Props>()
</script>

<template>
  <div class="aspect-square h-[300px] w-[300px] flex-none rounded-sm">
    <CmsImage
      :image="item"
      :is-expandable="true"
      class="aspect-square h-full flex-none rounded-sm"
    />
  </div>
</template>
