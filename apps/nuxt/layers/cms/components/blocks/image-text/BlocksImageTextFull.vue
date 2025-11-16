<script
    lang="ts"
    setup
  >
import type { ImageTextBlock } from '@repo/payload-types'

import CallToAction from '~~/layers/cms/components/cta/CallToAction.vue'
import SectionActions from '~base/components/section/SectionActions.vue'
import SectionHeader from '~base/components/section/SectionHeader.vue'
import SectionText from '~base/components/section/SectionText.vue'
import CmsImage from '~cms/components/image/CmsImage.vue'
import LexicalSerializer from '~cms/components/lexical/LexicalSerializer.vue'

interface Props {
  block: ImageTextBlock
}

defineProps<Props>()
</script>

<template>
  <section class="mt-20">
    <div
      class="relative flex h-[calc(100dvh-10rem)] flex-col justify-end bg-black"
    >
      <!-- Background image -->
      <CmsImage
        :image="block.image"
        class="absolute top-0 z-0 flex h-full w-full object-cover"
      />
      <!-- End background image -->
      <!-- Gradient overlay -->
      <div
        class="
          bottom-0 z-0 h-[50vh] w-full bg-transparent bg-linear-to-t from-black
          to-transparent
        "
      />
      <!-- End gradient overlay -->

      <!-- CTA actions -->
      <!-- Hero content -->
      <div class="z-10 w-full bg-black pb-12">
        <div class="container mx-auto flex flex-col gap-12 px-4">
          <div
            class="
              grid items-end justify-center gap-6 text-white
              lg:grid-cols-[0.6fr_0.4fr]
            "
          >
            <div class="flex flex-col gap-6">
              <p v-if="block.subtitle">
                {{ block.subtitle }}
              </p>
              <SectionHeader>
                <span class="text-hero leading-18 font-light">
                  {{ block.title }}
                </span>
              </SectionHeader>
            </div>

            <SectionText v-if="block.text">
              {{ block.text }}
            </SectionText>
            <LexicalSerializer
              v-if="block.richtext"
              :root="block.richtext.root"
            />
          </div>
          <SectionActions>
            <CallToAction
              v-for="(cta, index) in block.ctas"
              :key="index"
              :cta="cta.cta"
              variant="primary"
              class="text-sm"
            />
          </SectionActions>
        </div>
      </div>
    <!-- End hero content -->
    </div>
  </section>
</template>
