<script setup lang="ts">
import { tv } from 'tailwind-variants'

import type {
  CarouselEmits,
  CarouselProps,
  WithClassAsProps,
} from './carousel.type'
import { useProvideCarousel } from './useCarousel.composable'

const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
  autoplay: false,
  autoplayDelay: 3000,
  orientation: 'horizontal',
  pauseOnHover: true,
})

const emits = defineEmits<CarouselEmits>()

const {
  isAutoplayActive,
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  pauseAutoplay,
  resumeAutoplay,
  scrollNext,
  scrollPrev,
  scrollTo,
  startAutoplay,
  stopAutoplay,
  onMouseEnter,
  onMouseLeave,
} = useProvideCarousel(
  props,
  emits,
)

defineExpose({
  isAutoplayActive,
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  pauseAutoplay,
  resumeAutoplay,
  scrollNext,
  scrollPrev,
  scrollTo,
  startAutoplay,
  stopAutoplay,
  onMouseEnter,
  onMouseLeave,
})

function onKeyDown(event: KeyboardEvent): void {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey) {
    event.preventDefault()
    scrollPrev()

    return
  }

  if (event.key === nextKey) {
    event.preventDefault()
    scrollNext()
  }
}

const style = tv({
  base: `
    cursor-grab outline-none
    active:cursor-grabbing
  `,
})
</script>

<template>
  <!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
  <div
    :class="style({ class: props.class as string })"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeyDown"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="onMouseEnter"
    @focusout="onMouseLeave"
  >
    <slot
      :can-scroll-next
      :can-scroll-prev
      :carousel-api
      :carousel-ref
      :orientation
      :scroll-next
      :scroll-prev
    />
  </div>
</template>
