<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="mb-2 flex flex-col">
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
