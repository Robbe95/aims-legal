<script setup lang="ts">
import { VcIcon } from '@wisemen/vue-core-components'

import { useCarousel } from '~base/components/carousel/useCarousel.composable'

const i18n = useI18n()
const carousel = useCarousel()
</script>

<template>
  <button
    :aria-label="i18n.t('component.button.next.label')"
    class="cursor-pointer"
    @click="carousel.scrollNext"
  >
    <VcIcon
      class="size-xl"
      icon="arrowRight"
    />
  </button>
</template>
