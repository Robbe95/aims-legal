<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type z from 'zod'

import DisplayError from '~~/layers/base/components/error/DisplayError.vue'

const props = defineProps<{
  error: z.ZodError
}>()

const clipboard = useClipboard()
const i18n = useI18n()

function onCopyDetails(): void {
  clipboard.copy(JSON.stringify(props.error.format(), null, 2))
}
</script>

<template>
  <DisplayError
    :action="{
      label: clipboard.copied.value ? i18n.t('component.zod_error.copied') : i18n.t('component.zod_error.copy_details'),
      onClick: onCopyDetails,
    }"
    :title="i18n.t('component.zod_error.title')"
    :message="i18n.t('component.zod_error.message')"
  />
</template>
