<script setup lang="ts">
import type { CarouselBlock } from '@repo/payload-types'
import { VcBadge } from '@wisemen/vue-core-components'
import type { Component } from 'vue'

import { useInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'
import SectionText from '~base/components/section/SectionText.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'

interface Props {
  index: number
  item: CarouselBlock['items'][number]
  items: CarouselBlock['items']
}
const props = defineProps<Props>()

const link = useInternalLink(props.item.link)

const hasLink = computed<boolean>(() => {
  return Boolean(props.item.link?.url) || Boolean(props.item.link?.reference)
})

const linkComponent = computed<string | Component>(() => {
  return hasLink.value ? resolveComponent('NuxtLinkLocale') : 'div'
})
</script>

<template>
  <component
    :is="linkComponent"
    :to="(link as any)"
    class="group flex flex-col gap-6"
  >
    <div class="aspect-square h-[300px] w-[300px] flex-none rounded-sm">
      <button
        class="flex cursor-pointer flex-col"
      >
        <CmsImage
          :is-expandable="false"
          :image="item.image"
          class="aspect-square h-full flex-none rounded-sm"
        />
      </button>
    </div>
    <div
      v-if="item.tags && item.tags.length > 0"
      class="flex flex-wrap gap-3"
    >
      <VcBadge
        v-for="tag in item.tags"
        :key="tag"
        :class-config="{ root: 'rounded-md' }"
        color="gray"

        variant="translucent"
        class="text-sm text-secondary"
      >
        {{ tag }}
      </VcBadge>
    </div>
    <SectionText
      v-if="item.title"
      :class="{
        'group-hover:underline': hasLink,
      }"
      class="text-md"
    >
      {{ item.title }}
    </SectionText>
    <SectionText
      v-if="item.description"
      class="max-w-[300px] text-sm"
    >
      {{ item.description }}
    </SectionText>
  </component>
</template>
