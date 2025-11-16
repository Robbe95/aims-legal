<script setup lang="ts">
import { useSettingsHeaderQuery } from '~~/layers/cms/api/settings/query/useSettingsHeader.query'
import PageNavHeaderDesktop from '~cms/components/nav/header/desktop/PageNavHeaderDesktop.vue'
import PageNavHeaderMobile from '~cms/components/nav/header/mobile/PageNavHeaderMobile.vue'

const headerQuery = useSettingsHeaderQuery()

await headerQuery.suspense()
</script>

<template>
  <template v-if="headerQuery.data.value">
    <PageNavHeaderDesktop
      :header="headerQuery.data.value"
      class="
        hidden
        lg:grid
      "
    />
    <PageNavHeaderMobile
      :header="headerQuery.data.value"
      class="
        grid
        lg:hidden
      "
    />
  </template>
</template>
