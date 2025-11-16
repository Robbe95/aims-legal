<script setup lang="ts">
import type { HeroBlock } from '@repo/payload-types'

import Seperator from '~base/components/seperator/Seperator.vue'
import BlocksHeroLink from '~cms/components/blocks/hero/BlocksHeroLink.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'
import CmsVideo from '~cms/components/video/CmsVideo.vue'

interface Props {
  block: HeroBlock
}

defineProps<Props>()
</script>

<template>
  <section
    class="
      relative flex h-dvh flex-col justify-between overflow-hidden bg-primary
    "
  >
    <!-- Hero content -->
    <div class="z-10 mt-36 w-full bg-primary py-24 text-primary">
      <div class="container mx-auto flex flex-col px-4">
        <div
          class="
            grid items-center justify-center gap-2
            lg:grid-cols-[0.6fr_0.4fr]
          "
        >
          <span class="text-hero">
            {{ block.title }}
          </span>
          <div class="flex justify-end text-sm">
            <span class="max-w-[300px]">
              {{ block.text }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- End hero content -->
    <!-- Background image -->
    <CmsVideo
      v-if="block.backgroundVideo"
      :video="block.backgroundVideo"
      class="aspect-video h-full w-full flex-1 origin-top"
    />

    <CmsImage
      v-else-if="(typeof block.backgroundImage !== 'string')"
      :image="block.backgroundImage"
      class="w-full flex-1"
    />
    <!-- End background image -->
    <!-- Gradient overlay -->
    <div
      class="
        absolute bottom-0 z-0 h-[50vh] w-full bg-transparent bg-linear-to-t
        from-black/50 from-10% to-transparent
      "
    />
    <!-- End gradient overlay -->

    <!-- CTA actions -->
    <div
      class="
        pointer-events-none relative z-10 w-full bg-primary py-12 text-primary
      "
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
  </section>
</template>
