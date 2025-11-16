<script setup lang="ts">
import { VcIcon } from '@wisemen/vue-core-components'

const props = defineProps<{
  error?: Error
}>()
const {
  t,
} = useI18n()

console.error(props.error)
</script>

<template>
  <div
    class="
      mx-4 flex items-center gap-4 rounded-sm border border-error-800
      bg-error-50 p-4 text-error-800
    "
  >
    <VcIcon
      icon="alertCircle"
      class="size-4 text-error-800"
    />
    <div>
      <p class="text-sm">
        {{ t('cms.blocks.error_title') }}
      </p>
      <p class="text-sm">
        {{ t('cms.blocks.error') }}
      </p>
    </div>
  </div>
</template>
