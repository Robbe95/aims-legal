<script setup lang="ts">
import { tv } from '~base/libs/twVariants.lib'

import type { WithClassAsProps } from './carousel.type'
import { useCarousel } from './useCarousel.composable'

const props = defineProps<WithClassAsProps & { index: number }>()

const {
  activeIndex, orientation,
} = useCarousel()

const style = tv({
  base: '',
  variants: {
    orientation: {
      horizontal: 'pl-4',
      vertical: 'pt-4',
    },
  },
})

const state = computed<'active' | 'inactive'>(() => {
  if (activeIndex.value === props.index) {
    return 'active'
  }

  return 'inactive'
})
</script>

<template>
  <div
    :class="style({
      orientation,
      class: props.class as string,
    })"
    :data-state="state"
    role="group"
    aria-roledescription="slide"
  >
    <slot />
  </div>
</template>
