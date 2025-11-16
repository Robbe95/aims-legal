<script setup lang="ts">
interface Props {
  isReversed?: boolean
}

withDefaults(defineProps<Props>(), {
  isReversed: false,
})
</script>

<template>
  <div
    :class="{
      'grid-cols-1 lg:grid-cols-[0.4fr_0.6fr]': isReversed,
      'grid-cols-1 lg:grid-cols-[0.6fr_0.4fr]': !isReversed,
    }"
    class="grid w-full gap-4"
  >
    <slot />
  </div>
</template>
