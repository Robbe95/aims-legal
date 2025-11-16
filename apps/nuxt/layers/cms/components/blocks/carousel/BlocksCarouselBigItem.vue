<script setup lang="ts">
import type { CarouselBlock } from '@repo/payload-types'
import { VcIcon } from '@wisemen/vue-core-components'

import { useInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'
import CarouselItem from '~base/components/carousel/CarouselItem.vue'
import SectionText from '~base/components/section/SectionText.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'
import CmsLink from '~cms/components/link/CmsLink.vue'

interface Props {
  index: number
  item: CarouselBlock['items'][number]
  items: CarouselBlock['items']
}

const props = defineProps<Props>()

const link = useInternalLink(props.item.link)
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
      <button
        class="flex cursor-pointer flex-col"
      >
        <CmsImage
          :is-expandable="false"
          :image="item.image"
          class="h-full w-full rounded-sm"
        />
      </button>

      <div
        class="
          pointer-events-none absolute inset-0 rounded-sm bg-white/40
          duration-200
          group-data-[state=active]:opacity-0
        "
      />

      <div
        v-if="item.title"
        class="absolute right-0 bottom-0"
      >
        <CmsLink
          :url="link"
          class="flex items-center gap-2"
        >
          <div
            class="
              flex w-full min-w-[300px] flex-col gap-6 rounded-tl-sm bg-white
              p-10
            "
          >
            <div>
              <SectionText class="text-md">
                {{ item.title }}
              </SectionText>
            </div>
            <VcIcon
              icon="arrowRight"
              class="size-4"
            />
          </div>
        </CmsLink>
      </div>
    </div>
  </CarouselItem>
</template>
