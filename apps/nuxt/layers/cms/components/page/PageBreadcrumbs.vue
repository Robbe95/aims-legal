<script setup lang="ts">
import type { BreadcrumbsField } from '@repo/payload-types'

import type { Breadcrumb } from '~~/layers/base/components/breadcrumbs/Breadcrumbs.vue'
import Breadcrumbs from '~~/layers/base/components/breadcrumbs/Breadcrumbs.vue'
import { getInternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'

interface Props {
  breadcrumbs: NonNullable<BreadcrumbsField>
}

const props = defineProps<Props>()

const convertedBreadcrumbs = computed<Breadcrumb[]>(() => {
  return props.breadcrumbs.map((breadcrumb) => ({
    link: getInternalLink(breadcrumb.link) ?? null,
    text: breadcrumb.label,
  }))
})
</script>

<template>
  <div>
    <Breadcrumbs
      :breadcrumbs="convertedBreadcrumbs"
      theme="light"
    />
  </div>
</template>
