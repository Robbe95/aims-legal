<script setup lang="ts">
import { VcIcon } from '@wisemen/vue-core-components'

import { useCarousel } from '~base/components/carousel/useCarousel.composable'

const i18n = useI18n()
const carousel = useCarousel()
</script>

<template>
  <button
    :aria-label="i18n.t('component.button.previous.label')"
    class="cursor-pointer"
    @click="carousel.scrollPrev"
  >
    <VcIcon
      class="size-xl"
      icon="arrowLeft"
    />
  </button>
</template>
