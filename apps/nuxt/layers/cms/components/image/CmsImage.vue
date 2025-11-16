<script setup lang="ts">
import type { ClientImage } from '@repo/models'
import type { Image } from '@repo/payload-types'
import { useDialog } from '@wisemen/vue-core-components'

import CmsImageDialog from '~cms/components/image/CmsImageDialog.vue'

interface Props {
  isExpandable?: boolean
  image: string | ClientImage | Image
}

const props = defineProps<Props>()

function getImageUrl(url: string): string {
  return `${url}`
}

const isMounted = ref<boolean>(false)
const isLoaded = ref<boolean>(false)
const element = useTemplateRef('element')

onMounted(() => {
  isMounted.value = true

  if (element.value?.complete) {
    isLoaded.value = true
  }
})

function generateSrcset(sizes: ClientImage['sizes'] | Image['sizes']): string {
  if (!sizes) {
    return ''
  }

  return Object.values(sizes)
    .filter((size) => size.url && size.width)
    .map((size) => `${getImageUrl(size.url ?? '')} ${size.width}w`)
    .join(', ')
}

const dialog = useDialog(CmsImageDialog)

function onExpand(): void {
  if (typeof props.image === 'string') {
    return
  }

  dialog.open({
    image: props.image,
  })
}
</script>

<template>
  <template v-if="!isExpandable">
    <img
      v-if="typeof image !== 'string'"
      ref="element"
      :style="{
        objectPosition: `${image.focalX}% ${image.focalY}%`,
      }"
      :class="[
        $attrs.class,
        isLoaded ? 'scale-100 opacity-100' : 'scale-98 opacity-0',

      ]"
      :src="getImageUrl(image?.sizes?.desktop?.url ?? image.url ?? '')"
      :alt="image.alt ?? ''"
      :srcset="generateSrcset(image.sizes)"
      class="object-cover duration-200"
      @load="isLoaded = true"
    >
  </template>
  <template v-else>
    <button
      class="cursor-pointer"
      @click="onExpand"
    >
      <img
        v-if="typeof image !== 'string'"
        ref="element"
        :style="{
          objectPosition: `${image.focalX}% ${image.focalY}%`,
        }"
        :class="[
          $attrs.class,
        ]"
        :src="getImageUrl(image?.sizes?.desktop?.url ?? image.url ?? '')"
        :alt="image.alt ?? ''"
        :srcset="generateSrcset(image.sizes)"
        class="object-cover duration-200"
        @load="isLoaded = true"
      >
    </button>
  </template>
</template>
