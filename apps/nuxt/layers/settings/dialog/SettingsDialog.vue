<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core-components'
import {
  VcDialog,
  VcDialogCloseButton,
  VcDialogTitle,
  VcIcon,
} from '@wisemen/vue-core-components'
import { VisuallyHidden } from 'reka-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppUnstyledButton from '~base/components/app/button/AppUnstyledButton.vue'
import SettingsAccounts from '~settings/components/account/SettingsAccounts.vue'
import SettingsAppearance from '~settings/components/appearance/SettingsAppearance.vue'
import { useSettingNavigation } from '~settings/composables/useSettingsNavigation.composable'
import type { SettingKey } from '~settings/types/settingsKey.type'

// import AppSearchInputField from '@/components/app/AppSearchInputField.vue'
// import AppUnstyledButton from '@/components/app/AppUnstyledButton.vue'
// import AppAsyncComponent from '@/components/app/async-component/AppAsyncComponent.vue'
// import AppTextHighlight from '@/components/app/text-highlight/AppTextHighlight.vue'

const {
  t,
} = useI18n()

interface MenuItem<TKey> {
  title: string
  icon: Icon
  key: TKey
}

interface MenuItemGroup<TKey> {
  title: string
  items: MenuItem<TKey>[]
}

const menuItems = computed<MenuItemGroup<SettingKey>>(() => {
  return {
    title: t('settings.general_settings'),
    items: [],
  }
})

const navigation = useSettingNavigation({
  default: 'account',
})

const activeMenuItem = computed<SettingKey>(() => navigation.currentItem.value.item)

function isActive(key: SettingKey): boolean {
  return activeMenuItem.value === key
}

function onMenuItemClick(key: SettingKey): void {
  navigation.onNavigate(key)
}
</script>

<template>
  <VcDialog
    class="
      my-4xl flex size-full max-h-[80vh] max-w-[90vw]
      lg:max-w-[70vw]
    "
  >
    <div class="absolute top-2 right-2">
      <VcDialogCloseButton />
    </div>

    <div
      class="
        flex w-full max-w-[16rem] shrink-0 flex-col gap-xl overflow-y-auto
        border-r border-secondary bg-tertiary px-2xl py-xl
      "
    >
      <div class="flex flex-col gap-xl">
        <VisuallyHidden>
          <VcDialogTitle>
            <h1 class="text-lg font-bold text-primary">
              {{ t('settings.title') }}
            </h1>
          </VcDialogTitle>
        </VisuallyHidden>
      </div>

      <div
        class="flex flex-col gap-lg"
      >
        <span class="text-xs font-semibold text-tertiary uppercase">{{ menuItems.title }}</span>

        <div
          v-for="item in menuItems.items"
          :key="item.key"
        >
          <div class="-mx-xs flex flex-col gap-sm">
            <AppUnstyledButton
              class="
                group flex w-full cursor-pointer items-center gap-lg rounded-lg
                p-xxs transition-all
              "
              @click="onMenuItemClick(item.key)"
            >
              <span
                :class="{
                  'border-brand bg-brand-solid text-primary-on-brand': isActive(item.key),
                  'border-primary bg-primary text-primary': !isActive(item.key),
                }"
                class="
                  flex items-center justify-center rounded-lg border p-md
                  group-hover:border-brand
                "
              >
                <VcIcon
                  :icon="item.icon"
                  class="size-3"
                />
              </span>
              <span
                :class="{
                  'text-primary': isActive(item.key),
                  'text-tertiary': !isActive(item.key),
                }"
                class="
                  text-sm font-medium
                  group-hover:text-primary
                "
              >
                {{ item.title }}
              </span>
            </AppUnstyledButton>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col gap-2xl p-2xl">
      <SettingsAccounts v-if="isActive('account')" />
      <SettingsAppearance v-else-if="isActive('appearance')" />
    </div>
  </VcDialog>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
