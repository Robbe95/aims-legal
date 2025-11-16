<script setup lang="ts">
const {
  t,
} = useI18n()
</script>

<template>
  <div
    class="
      flex h-full min-h-80 flex-1 flex-col items-center justify-center gap-2
    "
  >
    <p class="font-bold text-gray-500">
      {{ t('base.shared.under_construction') }}
    </p>
    <p class="text-gray-300">
      {{ t('base.shared.coming_soon') }}
    </p>
    <slot />
  </div>
</template>
