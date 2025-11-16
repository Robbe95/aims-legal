<script setup lang="ts">
import { tv } from '~base/libs/twVariants.lib'

import type { WithClassAsProps } from './carousel.type'
import { useCarousel } from './useCarousel.composable'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<WithClassAsProps>()

const {
  carouselRef, orientation,
} = useCarousel()

const style = tv({
  base: 'flex',
  variants: {
    orientation: {
      horizontal: '-ml-4',
      vertical: '-mt-4 flex-col',
    },
  },
})
</script>

<template>
  <div
    ref="carouselRef"
    class="overflow-hidden"
  >
    <div
      :class="
        style({
          orientation,
          class: props.class as string,
        })
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
