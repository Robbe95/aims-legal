<script setup lang="ts">
const {
  t,
} = useI18n()
</script>

<template>
  <div
    class="
      flex min-h-screen min-w-screen flex-col items-center justify-center gap-8
      bg-white text-center
    "
  >
    <div>
      <h1 class="text-hero">
        {{ t('shared.base.404_title') }}
      </h1>
      <p class="max-w-lg text-lg">
        {{ t('shared.base.404_subsite_page_not_found') }}
      </p>
    </div>
  </div>
</template>
