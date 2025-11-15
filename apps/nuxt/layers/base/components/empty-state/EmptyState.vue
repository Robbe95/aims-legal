<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core-components'
import { VcIcon } from '@wisemen/vue-core-components'

interface Props {
  icon: Icon
}

defineProps<Props>()
</script>

<template>
  <div
    class="
      relative flex size-[480px] flex-col items-center justify-center rounded-md
    "
  >
    <div class="z-20 flex flex-col items-center justify-center text-center">
      <div
        class="mb-6 max-w-max rounded-md p-3"
      >
        <VcIcon
          :icon="icon"
          size="lg"
        />
      </div>
      <div class="flex flex-col gap-2">
        <slot />
      </div>
    </div>
  </div>
</template>
