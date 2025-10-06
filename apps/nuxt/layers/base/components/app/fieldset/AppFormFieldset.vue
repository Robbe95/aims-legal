<script setup lang="ts">
import { VisuallyHidden } from 'reka-ui'

import AppFieldset from '~base/components/app/fieldset/AppFieldset.vue'
import AppFieldsetLegend from '~base/components/app/fieldset/AppFieldsetLegend.vue'

const props = withDefaults(
  defineProps<{
    title: string
    isTitleHidden?: boolean
    description?: string | null
  }>(),
  {
    isTitleHidden: false,
    description: null,
  },
)
</script>

<template>
  <AppFieldset
    class="
      grid gap-x-6xl gap-y-xl
      md:grid-cols-3
    "
  >
    <div>
      <Component :is="props.isTitleHidden ? VisuallyHidden : 'div'">
        <AppFieldsetLegend
          as="h2"
          class="font-medium text-primary"
        >
          {{ props.title }}
        </AppFieldsetLegend>
      </Component>

      <p
        v-if="props.description !== null"
        class="mt-sm text-sm text-secondary"
      >
        {{ props.description }}
      </p>
    </div>

    <div class="col-span-2">
      <slot />
    </div>
  </AppFieldset>
</template>
