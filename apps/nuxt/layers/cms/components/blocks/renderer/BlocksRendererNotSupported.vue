<script setup lang="ts">
defineProps<{
  blockName: string
}>()

const {
  t,
} = useI18n()
</script>

<template>
  <div class="rounded-md border border-error-200 bg-error-50 p-4">
    <div class="flex flex-col gap-2">
      <p class="text-center text-error-800">
        {{ t('cms.blocks.not_supported', { blockName }) }}
      </p>
    </div>
  </div>
</template>
