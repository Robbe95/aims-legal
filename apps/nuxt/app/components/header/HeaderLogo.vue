<script setup lang="ts">
import { NuxtLinkLocale } from '#components'
import AppLogo from '~~/layers/base/components/logo/Logo.vue'
import { useSettingsHomepageQuery } from '~~/layers/cms/api/settings/query/useSettingsHomepage.query'
import { useInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'

const homePageQuery = useSettingsHomepageQuery()

await homePageQuery.suspense()

const link = useInternalLink(homePageQuery.data.value!)
</script>

<template>
  <NuxtLinkLocale
    v-if="link"
    :to="link"
    class="focus-visible:ring-black"
  >
    <AppLogo
      class="h-8"
    />
  </NuxtLinkLocale>
</template>
