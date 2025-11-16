<script setup lang="ts">
interface Props {
  noPadding?: boolean
}

withDefaults(defineProps<Props>(), {
  noPadding: false,
})
</script>

<template>
  <div
    :class="{
      'px-4': !noPadding,
    }"
    class="container mx-auto"
  >
    <slot />
  </div>
</template>
