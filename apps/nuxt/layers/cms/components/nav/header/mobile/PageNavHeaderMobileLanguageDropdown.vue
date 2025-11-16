<script setup lang="ts">
import { VcButton } from '@wisemen/vue-core-components'

import { SwitchLocalePathLink } from '#components'

const emit = defineEmits<{
  back: []
}>()

const {
  t,
} = useI18n()

const {
  locale, locales,
} = useI18n()
</script>

<template>
  <div class="grid">
    <div class="mt-4 mb-4">
      <VcButton
        :class-config="{
          iconLeft: '!size-3 mr-4',
          content: 'text-sm',
        }"
        icon-left="arrowLeft"
        @click="emit('back')"
      >
        {{ t('base.shared.back') }}
      </VcButton>
    </div>

    <div class="flex flex-row gap-16">
      <p>
        {{ `${t('base.language.select')}:` }}
      </p>
      <div class="mb-12 flex flex-row gap-6">
        <SwitchLocalePathLink
          v-for="listLocale in locales"
          :key="listLocale.code"
          :locale="listLocale.code"
          :class="{
            underline: listLocale.code === locale,
          }"
          variant="default"
          class="
            text-sm text-primary
            hover:underline
          "
        >
          {{ listLocale.code }}
        </SwitchLocalePathLink>
      </div>
    </div>
  </div>
</template>
