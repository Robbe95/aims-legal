<script setup lang="ts">
import type { ClientNavigationDropdown } from '@repo/models'

import { useWindowScroll } from '#imports'
import PageNavFooter from '~cms/components/nav/footer/PageNavFooter.vue'
import PageNavHeader from '~cms/components/nav/header/PageNavHeader.vue'
import type { DropdownType } from '~cms/composables/nav/useNavHeaderContext.composable'
import { provideNavHeaderContext } from '~cms/composables/nav/useNavHeaderContext.composable'

const {
  arrivedState,
} = useWindowScroll()

const openDropdown = ref<ClientNavigationDropdown | null>(null)
const openDropdownType = ref<DropdownType | null>(null)

const isTop = computed<boolean>(() => {
  return arrivedState.top
})

provideNavHeaderContext({
  isTop,
  openDropdown,
  openDropdownType,
})
</script>

<template>
  <div
    :class="{
      '[--dropdown-spacing:7.5rem]': isTop,
      '[--dropdown-spacing:4.5rem]': !isTop,
    }"
    class="flex min-h-screen flex-col justify-between"
  >
    <PageNavHeader />
    <main>
      <slot />
    </main>
    <PageNavFooter />
  </div>
</template>
