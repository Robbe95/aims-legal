<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="flex flex-col mb-2">
    <h2
      class="font-medium text-primary"
    >
      {{ props.title }}
    </h2>
    <p
      class="mt-sm text-sm text-secondary"
    >
      {{ props.subtitle }}
    </p>
  </div>
</template>
