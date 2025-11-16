<script setup lang="ts">
import type {
  ClientNavigationDropdown,
  ClientNavigationLink,
} from '@repo/models'

import PageNavItemDropdownMobile from '~cms/components/nav/PageNavItemDropdownMobile.vue'
import PageNavItemLink from '~cms/components/nav/PageNavItemLink.vue'

const props = withDefaults(defineProps<{
  hasArrow?: boolean
  navLink: ClientNavigationLink
}>(), {
  hasArrow: false,
})

const emits = defineEmits<{
  onDropdownClick: [navLink: ClientNavigationDropdown]
}>()
</script>

<template>
  <div class="text-black">
    <PageNavItemLink
      v-if="navLink.navType === 'link'"
      :nav-link="navLink"
      :has-arrow="props.hasArrow"
      class="w-full"
      variant="white"
    />
    <PageNavItemDropdownMobile
      v-else-if="navLink.navType === 'dropdown'"
      :nav-link="navLink"
      class="w-full"
      @on-dropdown-click="(navLink) => emits('onDropdownClick', navLink)"
    />
  </div>
</template>
