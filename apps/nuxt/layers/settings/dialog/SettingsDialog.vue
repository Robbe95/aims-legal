<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core'
import {
  VcDialog,
  VcDialogCloseButton,
  VcDialogTitle,
  VcIcon,
} from '@wisemen/vue-core'
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

const { t } = useI18n()

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
    items: [
      {
        title: t('settings.account'),
        icon: 'settings',
        key: 'account',
      },
      {
        title: t('settings.appearance'),
        icon: 'brush',
        key: 'appearance',
      },
    ],
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
  <VcDialog class="max-w-[90vw] lg:max-w-[70vw] size-full flex my-4xl max-h-[80vh]">
    <div class="absolute right-2 top-2">
      <VcDialogCloseButton />
    </div>

    <div class="bg-tertiary py-xl flex flex-col gap-xl w-full overflow-y-auto shrink-0 max-w-[16rem] border-r border-secondary px-2xl">
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
        <span class="text-tertiary uppercase text-xs font-semibold">{{ menuItems.title }}</span>

        <div
          v-for="item in menuItems.items"
          :key="item.key"
        >
          <div class="-mx-xs flex flex-col gap-sm">
            <AppUnstyledButton
              class="flex gap-lg p-xxs w-full rounded-lg group transition-all items-center cursor-pointer"
              @click="onMenuItemClick(item.key)"
            >
              <span
                :class="{
                  'bg-brand-solid border-brand text-primary-on-brand': isActive(item.key),
                  'bg-primary border-primary text-primary': !isActive(item.key),
                }"
                class="flex group-hover:border-brand items-center justify-center p-md border rounded-lg"
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
                class="text-sm group-hover:text-primary font-medium"
              >
                {{ item.title }}
              </span>
            </AppUnstyledButton>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2xl p-2xl w-full">
      <SettingsAccounts v-if="isActive('account')" />
      <SettingsAppearance v-else-if="isActive('appearance')" />
    </div>
  </VcDialog>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
