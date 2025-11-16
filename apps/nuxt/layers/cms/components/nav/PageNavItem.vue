<script setup lang="ts">
import type { ClientNavigationLink } from '@repo/models'

import PageNavItemDropdown from '~cms/components/nav/PageNavItemDropdown.vue'
import PageNavItemLink from '~cms/components/nav/PageNavItemLink.vue'

const props = withDefaults(defineProps<{
  hasArrow?: boolean
  navLink: ClientNavigationLink
  variant?: 'seeThrough' | 'white'
}>(), {
  hasArrow: false,
  variant: 'seeThrough',
})
</script>

<template>
  <div class="text-white">
    <PageNavItemLink
      v-if="navLink.navType === 'link'"
      :nav-link="navLink"
      :variant="props.variant"
      :has-arrow="props.hasArrow"
    />

    <PageNavItemDropdown
      v-else-if="navLink.navType === 'dropdown'"
      :nav-link="navLink"
      :variant="props.variant"
    />
  </div>
</template>
