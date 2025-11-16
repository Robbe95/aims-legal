<script setup lang="ts">
/**
 * A generic error display component that shows a title, message, and an optional action button.
 */
import { VcButton } from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  title: string
  action?: {
    label: string
    onClick: () => void
  } | null
  message: string
}>(), {
  action: null,
})

const i18n = useI18n()
</script>

<template>
  <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
  <div
    class="
      duration-500
      starting:opacity-0 starting:blur-md
    "
  >
    <span class="block text-center text-xl font-bold text-secondary">
      {{ props.title }}
    </span>

    <p
      class="mx-auto mt-md max-w-sm text-center text-sm text-secondary"
    >
      {{ i18n.t('component.error.message_prefix') }} — {{ props.message }}
    </p>

    <VcButton
      v-if="props.action !== null"
      class="mx-auto mt-2xl"
      variant="secondary"
      @click="props.action.onClick"
    >
      {{ props.action.label }}
    </VcButton>
  </div>
</template>
