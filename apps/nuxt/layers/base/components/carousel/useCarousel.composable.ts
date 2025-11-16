import { createInjectionState } from '@vueuse/core'
import emblaCarouselVue from 'embla-carousel-vue'
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

import type {
  CarouselEmits,
  CarouselProps,
  UnwrapRefCarouselApi as CarouselApi,
} from './carousel.type'

const [
  useProvideCarousel,
  useInjectCarousel,
] = createInjectionState(
  ({
    autoplay = false,
    autoplayDelay = 3000,
    opts,
    orientation,
    pauseOnHover = true,
    plugins,
  }: CarouselProps, emits: CarouselEmits) => {
    const [
      emblaNode,
      emblaApi,
    ] = emblaCarouselVue({
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    }, plugins)

    const activeIndex = ref<number>(0)
    let isManualNavigation = false

    function scrollPrev(): void {
      isManualNavigation = true
      emblaApi.value?.scrollPrev()
    }

    function scrollNext(): void {
      isManualNavigation = true
      emblaApi.value?.scrollNext()
    }

    function scrollTo(index: number, jump?: boolean): void {
      isManualNavigation = true
      emblaApi.value?.scrollTo(index, jump)
    }

    const canScrollNext = ref<boolean>(false)
    const canScrollPrev = ref<boolean>(false)
    const isAutoplayActive = ref<boolean>(autoplay)
    let autoplayTimer: ReturnType<typeof setTimeout> | null = null

    function startAutoplay(): void {
      if (!autoplay || !emblaApi.value) {
        return
      }

      stopAutoplay()

      autoplayTimer = setTimeout(() => {
        autoplayTimer = null
        isManualNavigation = false

        if (emblaApi.value?.canScrollNext()) {
          emblaApi.value.scrollNext()
        }
        else {
          emblaApi.value?.scrollTo(0)
        }

        startAutoplay()
      }, autoplayDelay)
    }

    function stopAutoplay(): void {
      if (autoplayTimer) {
        clearTimeout(autoplayTimer)
        autoplayTimer = null
      }
    }

    function pauseAutoplay(): void {
      if (isAutoplayActive.value) {
        stopAutoplay()
      }
    }

    function resumeAutoplay(): void {
      if (autoplay && isAutoplayActive.value) {
        startAutoplay()
      }
    }

    function onMouseEnter(): void {
      if (pauseOnHover) {
        pauseAutoplay()
      }
    }

    function onMouseLeave(): void {
      if (pauseOnHover) {
        resumeAutoplay()
      }
    }

    function onSelect(api: CarouselApi): void {
      canScrollNext.value = api?.canScrollNext() || false
      canScrollPrev.value = api?.canScrollPrev() || false
      activeIndex.value = api?.selectedScrollSnap() || 0

      if (autoplay && isAutoplayActive.value && isManualNavigation) {
        stopAutoplay()
        startAutoplay()
        isManualNavigation = false
      }
    }

    onMounted(() => {
      if (!emblaApi.value) {
        return
      }

      emblaApi.value?.on('init', onSelect)
      emblaApi.value?.on('reInit', onSelect)
      emblaApi.value?.on('select', onSelect)

      if (autoplay) {
        startAutoplay()
      }

      emits('init-api', emblaApi.value)
    })

    onUnmounted(() => {
      stopAutoplay()

      if (emblaApi.value) {
        emblaApi.value.off('init', onSelect)
        emblaApi.value.off('reInit', onSelect)
        emblaApi.value.off('select', onSelect)
      }
    })

    return {
      isAutoplayActive,
      activeIndex,
      canScrollNext,
      canScrollPrev,
      carouselApi: emblaApi,
      carouselRef: emblaNode,
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
    }
  },
)

function useCarousel() {
  const carouselState = useInjectCarousel()

  if (!carouselState) {
    throw new Error('useCarousel must be used within a <AppCarousel />')
  }

  return carouselState
}

export {
  useCarousel, useProvideCarousel,
}
