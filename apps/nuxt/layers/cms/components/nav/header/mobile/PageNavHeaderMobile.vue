<script setup lang="ts">
import type {
  ClientNavigationDropdown,
  ClientSettingsHeader,
} from '@repo/models'
import {
  useDialog,
  VcIconButton,
} from '@wisemen/vue-core-components'
import { watch } from 'vue'

import HeaderLogo from '~/components/header/HeaderLogo.vue'
import Container from '~~/layers/base/components/container/Container.vue'
import PageNavHeaderMobileDialog from '~~/layers/cms/components/nav/header/mobile/PageNavHeaderMobileDialog.vue'
import { usePageContext } from '~~/layers/cms/composables/page/usePageContext.composable'
import type { DropdownType } from '~cms/composables/nav/useNavHeaderContext.composable'
import { provideNavHeaderContext } from '~cms/composables/nav/useNavHeaderContext.composable'

interface Props {
  header: ClientSettingsHeader
}

const props = defineProps<Props>()

const {
  t,
} = useI18n()

const openDropdown = ref<ClientNavigationDropdown | null>(null)
const openDropdownType = ref<DropdownType | null>(null)
const isMenuOpen = ref<boolean>(false)

const {
  pageTheme,
} = usePageContext()

const {
  arrivedState,
} = useWindowScroll()

const isTop = computed<boolean>(() => {
  return arrivedState.top
})

const variant = computed<'seeThrough' | 'white'>(() => {
  if (isMenuOpen.value) {
    return 'white'
  }
  if (pageTheme.value === 'solid') {
    return 'white'
  }

  if (!isTop.value) {
    return 'white'
  }

  if (openDropdownType.value === 'language') {
    return 'white'
  }

  if (openDropdown.value !== null) {
    return 'white'
  }

  return 'seeThrough'
})

// Close other dropdown when dropdown opens
watch(openDropdown, () => {
  if (openDropdownType.value === 'language') {
    openDropdown.value = null
  }

  if (openDropdownType.value === 'search') {
    openDropdown.value = null
  }
})

provideNavHeaderContext({
  isTop,
  openDropdown,
  openDropdownType,
})

const dialog = useDialog(PageNavHeaderMobileDialog)

function onMenuOpen(): void {
  isMenuOpen.value = true
  dialog.open({
    'header': props.header,
    'onUpdate:isOpen': (value: boolean) => {
      isMenuOpen.value = value
      dialog.close()
    },
  })
}
</script>

<template>
  <header>
    <!-- Gradient overlay -->
    <div
      v-if="pageTheme === 'transparent'"
      class="
        absolute top-0 z-10 h-[50vh] w-full bg-transparent bg-linear-to-b
        from-black/50 from-10% to-transparent
      "
    />
    <!-- End gradient overlay -->

    <div
      :class="{
        'bg-primary': variant === 'white',
        'bg-transparent': variant === 'seeThrough',
      }"
      class="fixed z-50 w-full py-4 transition-all duration-200"
    >
      <Container>
        <div
          class="flex items-center justify-between"
        >
          <HeaderLogo
            :class="{
              'text-white': variant === 'seeThrough',
              'text-primary': variant === 'white',
            }"
          />
          <VcIconButton
            :label="t('cms.nav.header.menu_icon')"
            :variant="('transparent' as any)"
            :class-config="{
              icon: `${variant === 'white'
                ? 'text-primary' : 'text-white'} duration-200`
              ,
            }"
            icon="menu"
            class="lg:hidden"
            @click="onMenuOpen"
          />
        </div>
      </Container>
    </div>
  </header>
</template>
