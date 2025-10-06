<script setup lang="ts">
import {
  VcButton,
  VcDropdownMenu,
  VcDropdownMenuGroup,
  VcDropdownMenuItem,
} from '@wisemen/vue-core-components'

const {
  locale, locales,
} = useI18n()

type LocaleObject = typeof locales.value[number]
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed<LocaleObject[]>(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<template>
  <VcDropdownMenu
    popover-align="end"
  >
    <template #trigger>
      <VcButton variant="secondary">
        {{ locale.toUpperCase() }}
      </VcButton>
    </template>

    <template #content>
      <VcDropdownMenuGroup>
        <VcDropdownMenuItem
          v-for="availableLocale in availableLocales"
          :key="availableLocale.code"
          :label="availableLocale.code.toUpperCase()"
          @select="navigateTo(switchLocalePath(availableLocale.code))"
        />
      </VcDropdownMenuGroup>
    </template>
  </VcDropdownMenu>
</template>
