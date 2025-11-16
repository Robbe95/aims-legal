<script setup lang="ts">
import type { HeroBlock } from '@repo/payload-types'

import Seperator from '~base/components/seperator/Seperator.vue'
import BlocksHeroLink from '~cms/components/blocks/hero/BlocksHeroLink.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'
import CmsVideo from '~cms/components/video/CmsVideo.vue'

interface Props {
  block: HeroBlock
}

const props = defineProps<Props>()

const hasVideo = computed<boolean>(() => {
  if (!props.block.backgroundVideo) {
    return false
  }

  return true
})
</script>

<template>
  <section
    v-if="block.blockType === 'hero'"
    :class="[
      hasVideo ? 'sm:min-h-dvh' : 'min-h-dvh',
    ]"
    class="relative mb-20 flex flex-col justify-between bg-primary-solid pb-12"
  >
    <!-- Background image/video -->
    <CmsVideo
      v-if="props.block.backgroundVideo"
      :video="props.block.backgroundVideo"
      class="absolute top-0 z-0 flex aspect-video h-full w-full object-cover"
    />

    <CmsImage
      v-else-if="(typeof block.backgroundImage !== 'string')"
      :image="block.backgroundImage"
      class="absolute top-0 z-0 flex h-full w-full object-cover"
    />
    <!-- End background image/video -->
    <!-- Gradient overlay -->
    <div
      class="
        absolute bottom-0 z-0 h-[50vh] w-full bg-transparent bg-gradient-to-t
        from-black/50 from-10% to-transparent
      "
    />
    <!-- End gradient overlay -->

    <!-- CTA actions -->
    <div
      class="pointer-events-none relative z-10 w-full py-12"
    >
      <div class="container mx-auto flex flex-col px-4 py-1">
        <div class="mt-30 text-white">
          <div class="pointer-events-auto flex justify-stretch gap-8">
            <template
              v-for="(cta, index) in block.ctas"
              :key="index"
            >
              <BlocksHeroLink
                :cta="cta.cta"
              />
              <Seperator
                class="
                  my-1 self-stretch bg-primary
                  last:hidden
                "
                direction="vertical"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- End CTA actions -->
    <!-- Hero content -->
    <div class="z-10 w-full">
      <div class="container mx-auto flex flex-col px-4">
        <div
          class="
            grid items-center justify-center gap-2 text-white
            lg:grid-cols-[0.6fr_0.4fr]
          "
        >
          <h1 class="text-hero">
            {{ block.title }}
          </h1>
          <span class="text-sm">
            {{ block.text }}
          </span>
        </div>
      </div>
    </div>
  <!-- End hero content -->
  </section>
</template>
