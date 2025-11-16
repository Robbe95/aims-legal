<script setup lang="ts">
import { SwitchLocalePathLink } from '#components'

const {
  locale,
  locales,
  t,
} = useI18n()
</script>

<template>
  <div
    class="
      fixed top-(--dropdown-spacing) left-0 z-50 w-screen bg-primary
      duration-200 ease-in-out
    "
  >
    <div class="container mx-auto px-sm py-6xl">
      <div class="grid grid-cols-2">
        <div
          v-show="locales.length > 0"
          class="flex w-full flex-row items-center justify-end gap-16 px-4"
        >
          <p>
            {{ `${t('base.language.select')}:` }}
          </p>
          <ul class="flex w-full flex-row justify-end gap-12">
            <li
              v-for="singleLocale in locales"
              :key="singleLocale.code"
            >
              <SwitchLocalePathLink
                :locale="singleLocale.code"
                :class="{
                  underline: singleLocale.code === locale,
                }"
                variant="default"
                class="
                  text-sm text-primary
                  hover:underline
                "
              >
                {{ singleLocale.code }}
              </SwitchLocalePathLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
