<script setup lang="ts">
import { NuxtLinkLocale } from '#components'

const i18n = useI18n()

const currentYear = computed<number>(() => {
  return new Date().getFullYear()
})
</script>

<template>
  <footer class="text-gray-600">
    <div
      class="
        container mx-auto flex flex-col items-center px-5 py-8
        sm:flex-row
      "
    >
      <NuxtLinkLocale
        :to="{
          name: 'index',
        }"
        class="
          flex items-center justify-center font-medium text-gray-900
          md:justify-start
        "
      >
        <span class="ml-3 text-xl">
          {{ i18n.t('app.logo') }}

        </span>
      </NuxtLinkLocale>

      <p
        class="
          mt-4 text-sm text-gray-500
          sm:mt-0 sm:ml-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4
        "
      >
        {{ i18n.t('app.footer.copyright', {
          year: currentYear,
        }) }}
      </p>
    </div>
  </footer>
</template>
