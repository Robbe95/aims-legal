<script setup lang="ts">
import {
  VcConfigProvider,
  VcDialogContainer,
  VcThemeProvider,
  VcToastContainer,
} from '@wisemen/vue-core-components'
import { ConfigProvider as RekaConfigProvider } from 'reka-ui'

import {
  DevOnly,
  NuxtLayout,
  NuxtLoadingIndicator,
  NuxtPage,
} from '#components'
import QueryDevtools from '~/components/query/QueryDevtools.vue'
import SeoIdentity from '~~/layers/seo/components/SeoIdentity.vue'

function useIdFunction() {
  return useId()
}

const locale = useI18n().locale
</script>

<template>
  <div class="flex w-screen flex-1">
    <DevOnly>
      <QueryDevtools />
    </DevOnly>
    <div
      class="w-full"
    >
      <SeoIdentity>
        <RekaConfigProvider :use-id="useIdFunction">
          <VcConfigProvider
            :locale="locale"
            teleport-target-selector="#target"
          >
            <VcThemeProvider>
              <NuxtLoadingIndicator color="#FFFFFF" />
              <NuxtLayout>
                <NuxtPage />
              </NuxtLayout>
              <div id="target" />
              <VcDialogContainer />
              <VcToastContainer />
            </VcThemeProvider>
          </VcConfigProvider>
        </RekaConfigProvider>
      </SeoIdentity>
    </div>
  </div>
</template>
