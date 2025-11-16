<script setup lang="ts">
/**
 * Displays a generic API error message with an action to go back.
 */
import type { ApiExpectedError } from '@wisemen/vue-core-api-utils'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import DisplayError from '~~/layers/base/components/error/DisplayError.vue'

const props = defineProps<{
  error: ApiExpectedError
}>()

const i18n = useI18n()
const router = useRouter()

const firstError = computed<ApiExpectedError['errors'][number] | null>(() => {
  const [
    firstError,
  ] = props.error.errors ?? []

  return firstError ?? null
})
</script>

<template>
  <DisplayError
    :title="firstError?.status ?? i18n.t('component.api_error.default_title')"
    :message="firstError?.detail ?? i18n.t('component.api_error.default_message')"
    :action="{
      label: 'Go back',
      onClick: () => router.back(),
    }"
  />
</template>
