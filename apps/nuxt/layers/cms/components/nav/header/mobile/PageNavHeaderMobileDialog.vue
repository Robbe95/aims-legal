<script setup lang="ts">
import type {
  ClientNavigationDropdown,
  ClientSettingsHeader,
} from '@repo/models'
import {
  VcButton,
  VcDialogContent,
  VcDialogOverlay,
  VcDialogOverlayTransition,
  VcDialogPortal,
  VcDialogRoot,
  VcTextField,
} from '@wisemen/vue-core-components'
import { Motion } from 'motion-v'

import AnimateHeight from '~~/layers/base/components/animate/AnimateHeight.vue'
import PageNavHeaderMobileDropdown from '~cms/components/nav/header/mobile/PageNavHeaderMobileDropdown.vue'
import PageNavHeaderMobileItem from '~cms/components/nav/header/mobile/PageNavHeaderMobileItem.vue'
import PageNavHeaderMobileLanguageDropdown from '~cms/components/nav/header/mobile/PageNavHeaderMobileLanguageDropdown.vue'

defineProps<{
  header: ClientSettingsHeader
}>()

const emit = defineEmits<{
  close: []
}>()

const {
  t,
} = useI18n()

const isOpen = defineModel<boolean>('isOpen', {
  default: false,
})

const searchInput = ref<string>('')

const viewType = ref<'dropdown' | 'language' | 'menu' | 'search'>('menu')
const selectedDropdown = ref<ClientNavigationDropdown | null>(null)

function onSearchFocus(): void {
  viewType.value = 'search'
}

function onBack(): void {
  viewType.value = 'menu'
  selectedDropdown.value = null
}

function onDropdownClick(navLink: ClientNavigationDropdown): void {
  viewType.value = 'dropdown'
  selectedDropdown.value = navLink
}
</script>

<template>
  <VcDialogRoot
    v-model:is-open="isOpen"
    @close="emit('close')"
  >
    <VcDialogPortal>
      <VcDialogOverlay>
        <VcDialogOverlayTransition />
      </VcDialogOverlay>
      <VcDialogContent
        class="
          top-(--dropdown-spacing) -translate-y-0 border-none shadow-none
          [--dropdown-spacing:4.5rem]
        "
        @open-auto-focus.prevent
      >
        <Motion
          :initial="{
            opacity: 0,
            scale: 1,
          }"
          :animate="{
            opacity: 1,
            scale: 1,
            y: 0,
          }"
          :exit="{
            opacity: 0,
          }"
          :layout-root="true"

          class="w-full rounded-none"
        >
          <div class="mt-4">
            <AnimateHeight>
              <VcButton
                v-if="viewType === 'search'"
                :class-config="{
                  iconLeft: '!size-3 mr-4',
                  content: 'text-sm',
                }"
                icon-left="arrowLeft"
                class="px-4"
                @click="onBack"
              >
                {{ t('base.shared.back') }}
              </VcButton>
            </AnimateHeight>
            <AnimateHeight>
              <VcTextField
                v-if="viewType === 'menu' || viewType === 'search'"
                v-model="searchInput"
                :class-config="
                  {
                    input: 'placehoder:lowercase',
                  }
                "

                :placeholder="t('cms.nav.header.search.placeholder')"
                class="w-full px-4"
                @focus="onSearchFocus"
              />
            </AnimateHeight>
            <AnimateHeight>
              <PageNavHeaderMobileDropdown
                v-if="viewType === 'dropdown' && selectedDropdown"
                :dropdown="selectedDropdown"
                class="px-4"
                @back="onBack"
              />
              <div
                v-else-if="viewType === 'menu'"
              >
                <div class="flex flex-col gap-4 px-4 py-4">
                  <PageNavHeaderMobileItem
                    v-for="navLink in header.headerLinks"
                    :key="navLink.label"
                    :nav-link="navLink"
                    @on-dropdown-click="onDropdownClick"
                  />
                </div>
              </div>
              <PageNavHeaderMobileLanguageDropdown
                v-else-if="viewType === 'language'"
                class="px-4"
                @back="onBack"
              />
            </AnimateHeight>
          </div>
        </Motion>
      </VcDialogContent>
    </VcDialogPortal>
  </VcDialogRoot>
</template>
