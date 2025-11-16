<!-- eslint-disable max-depth -->
<script setup lang="ts">
import { tv } from '~base/libs/twVariants.lib'

const attrs = useAttrs()

const style = tv({
  base: 'text-sm whitespace-pre-line',
})
</script>

<template>
  <p
    :class="style({ class: attrs.class as string })"
    class="font-light"
  >
    <slot />
  </p>
</template>
