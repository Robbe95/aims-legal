<script setup lang="ts">
import type { CardListBlock } from '@repo/payload-types'
import { VcBadge } from '@wisemen/vue-core-components'

import { NuxtLinkLocale } from '#components'
import { useInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'
import SectionText from '~base/components/section/SectionText.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'

interface Props {
  item: CardListBlock['cards'][number]
}
const props = defineProps<Props>()

const link = useInternalLink(props.item.link)

const hasLink = computed<boolean>(() => {
  return Boolean(props.item.link?.url) || Boolean(props.item.link?.reference)
})
</script>

<template>
  <div
    class="group flex flex-col gap-6"
  >
    <NuxtLinkLocale
      :to="(link as any)"
      class="group flex flex-col gap-6"
    >
      <div class="aspect-square flex-none rounded-sm">
        <CmsImage
          :is-expandable="!hasLink"
          :image="item.image"
          class="aspect-square h-full flex-none rounded-sm"
        />
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
        class="text-sm text-secondary"
      >
        {{ item.description }}
      </SectionText>
    </NuxtLinkLocale>
  </div>
</template>
