<script setup lang="ts">
import type { ClientSettingsHeader } from '@repo/models'
import {
  computed,
  watch,
} from 'vue'

import HeaderLogo from '~/components/header/HeaderLogo.vue'
import Container from '~~/layers/base/components/container/Container.vue'
import Seperator from '~~/layers/base/components/seperator/Seperator.vue'
import { usePageContext } from '~~/layers/cms/composables/page/usePageContext.composable'
import PageNavHeaderDesktopDropdown from '~cms/components/nav/header/desktop/PageNavHeaderDesktopDropdown.vue'
import PageNavHeaderDesktopLanguageDropdown from '~cms/components/nav/header/desktop/PageNavHeaderDesktopLanguageDropdown.vue'
import PageNavItem from '~cms/components/nav/PageNavItem.vue'
import { useNavHeaderContext } from '~cms/composables/nav/useNavHeaderContext.composable'

interface Props {
  header: ClientSettingsHeader
}

const props = defineProps<Props>()

const {
  pageTheme,
} = usePageContext()

const {
  isTop,
  openDropdown,
  openDropdownType,
} = useNavHeaderContext()

const variant = computed<'seeThrough' | 'white'>(() => {
  if (pageTheme.value === 'solid') {
    return 'white'
  }

  if (!isTop.value) {
    return 'white'
  }

  if (openDropdownType.value === 'language' || openDropdownType.value === 'search') {
    return 'white'
  }

  if (openDropdown.value !== null) {
    return 'white'
  }

  return 'seeThrough'
})

function handleCloseDropdown(): void {
  openDropdown.value = null
  openDropdownType.value = null
}

// Close other dropdown when dropdown opens
watch(openDropdown, () => {
  if (openDropdownType.value === 'language') {
    openDropdown.value = null
  }

  if (openDropdownType.value === 'search') {
    openDropdown.value = null
  }
})

const isDropdownOpen = computed<boolean>(() => {
  return openDropdownType.value !== null
})
</script>

<template>
  <!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
  <!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
  <header
    :class="{
      '[--dropdown-spacing:7.5rem]': isTop,
      '[--dropdown-spacing:4.5rem]': !isTop,
    }"
  >
    <!-- Gradient overlay -->
    <div
      v-if="pageTheme === 'transparent'"
      class="
        absolute top-0 z-10 h-[50vh] w-full bg-transparent bg-linear-to-b
        from-black/50 from-10% to-transparent
      "
    />
    <!-- End gradient overlay -->
    <!-- Dropdown overlay -->
    <Transition
      :duration="200"
      name="fade"
    >
      <div
        v-if="isDropdownOpen"
        class="fixed inset-0 z-40 h-screen w-screen bg-black/20"
        @click="handleCloseDropdown"
      />
    </Transition>
    <!-- End dropdown overlay -->
    <Transition
      :duration="200"
      name="fade"
    >
      <PageNavHeaderDesktopDropdown v-if="openDropdownType === 'menu'" />
      <PageNavHeaderDesktopLanguageDropdown
        v-else-if="openDropdownType === 'language'"
      />
    </Transition>

    <div
      :class="{
        'bg-white': variant === 'white',
        'bg-transparent': variant === 'seeThrough',
      }"
      class="fixed top-0 z-50 w-full pt-4 transition-all duration-200"
    >
      <Container>
        <div
          class="
            flex items-center justify-between
            lg:grid lg:grid-cols-3 lg:items-center lg:justify-center
          "
        >
          <HeaderLogo
            :class="{
              'text-white': variant === 'seeThrough',
              'text-black': variant === 'white',
            }"
          />
          <div />
          <div class="flex items-center justify-end gap-4">
            <PageNavItem
              v-for="navLink in props.header.headerLinks"
              :key="navLink.label"
              :nav-link="navLink"
              :variant="variant"
            />
            <Seperator
              :class="{
                'bg-white': variant === 'seeThrough',
                'bg-gray-500': variant === 'white',
              }"
              class="my-2 h-auto flex-none self-stretch duration-200"
              direction="vertical"
            />
          </div>
        </div>
      </Container>
      <Seperator
        :class="{
          'bg-transparent': variant === 'seeThrough',
          'bg-gray-500': variant === 'white',
        }"
        class="mt-4"
        direction="horizontal"
      />
    </div>
  </header>
</template>
