<script setup lang="ts">
import type { ClientNavigationDropdown } from '@repo/models'
import { VcIcon } from '@wisemen/vue-core-components'

interface Props {
  navLink: ClientNavigationDropdown
}

const props = defineProps<Props>()
const emits = defineEmits<{
  onDropdownClick: [navLink: ClientNavigationDropdown]
}>()

function handleDropdownClick(): void {
  emits('onDropdownClick', props.navLink)
}
</script>

<template>
  <button
    class="w-full"
    @click="handleDropdownClick"
  >
    <div class="flex items-center justify-between">
      <p>
        {{ navLink.label }}
      </p>

      <VcIcon
        icon="arrowRight"
        class="ml-2 size-4 duration-200"
        size="sm"
      />
    </div>
  </button>
</template>
