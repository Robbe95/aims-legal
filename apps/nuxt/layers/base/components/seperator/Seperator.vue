<script setup lang="ts">
import { tv } from '~base/libs/twVariants.lib'

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
}>(), {
  direction: 'horizontal',
})

const style = tv({
  base: 'bg-gray-500',
  variants: {
    direction: {
      horizontal: 'h-px w-full',
      vertical: 'w-px',
    },
  },
})

const attrs = useAttrs()
</script>

<template>
  <div
    :class="
      style({
        direction: props.direction,
        class: attrs.class as string,
      })
    "
    role="presentation"
  />
</template>
