<script setup lang="ts">
import type { Page } from '@repo/payload-types'

import BlocksRenderer from '~cms/components/blocks/renderer/BlocksRenderer.vue'
import PageBreadcrumbs from '~cms/components/page/PageBreadcrumbs.vue'

interface Props {
  page: Page
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative flex flex-col gap-4 bg-primary text-primary"
  >
    <PageBreadcrumbs
      v-if="page.breadcrumbs"
      :breadcrumbs="page.breadcrumbs"
      class="
        absolute top-32 left-0 z-20 flex w-full items-center justify-center
      "
    />

    <BlocksRenderer
      v-if="page.blocks"
      :blocks="page.blocks"
    />
  </div>
</template>
