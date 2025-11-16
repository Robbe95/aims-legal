<script setup lang="ts">
import type { ClientImage } from '@repo/models'
import type { Image } from '@repo/payload-types'
import { VcDialog } from '@wisemen/vue-core-components'

import CmsImage from '~cms/components/image/CmsImage.vue'

interface Props {
  image: ClientImage | Image
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const isOpen = defineModel<boolean>('isOpen', {
  default: false,
})
</script>

<template>
  <VcDialog
    v-model:is-open="isOpen"
    class="z-50 !rounded-sm"
    @close="emit('close')"
  >
    <CmsImage
      :image="image"
      class="max-h-[80vh] max-w-[80vw] object-contain"
    />
  </VcDialog>
</template>
