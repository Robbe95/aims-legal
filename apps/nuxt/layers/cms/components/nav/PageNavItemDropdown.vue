<script setup lang="ts">
import type { ClientNavigationDropdown } from '@repo/models'
import {
  VcButton,
  VcIcon,
} from '@wisemen/vue-core-components'

import { useNavHeaderContext } from '~cms/composables/nav/useNavHeaderContext.composable'

interface Props {
  navLink: ClientNavigationDropdown
  variant?: 'seeThrough' | 'white'
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'white',
})

const context = useNavHeaderContext()

const isThisDropdownOpen = computed<boolean>(() => {
  return context.openDropdown.value?.label === props.navLink.label
})

function handleDropdownClick(): void {
  if (isThisDropdownOpen.value) {
    context.openDropdown.value = null

    return
  }

  context.openDropdown.value = props.navLink
  context.openDropdownType.value = 'menu'
}

const rootTextColor = computed<string>(() => {
  return props.variant === 'white' ? 'text-primary' : 'text-white'
})
</script>

<template>
  <VcButton
    :class-config="{
      root: `${rootTextColor} duration-100`,
    }"
    variant="transparent"
    class="text-md text-nowrap"
    @click="handleDropdownClick"
  >
    <div class="flex items-center">
      {{ navLink.label }}

      <VcIcon
        :class="{
          'rotate-180': isThisDropdownOpen,
        }"
        icon="chevronDown"
        class="size-lg ml-2 duration-200"
        size="sm"
      />
    </div>
  </VcButton>
</template>
