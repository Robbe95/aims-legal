<script setup lang="ts">
import AppContainer from '~base/components/app/container/AppContainer.vue'

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex w-full flex-1 flex-col">
    <div class="sticky top-0 z-10 bg-primary">
      <AppContainer>
        <div class="flex min-h-10 items-center justify-between">
          <h1
            class="text-display-xs font-semibold text-primary"
          >
            {{ props.title }}
          </h1>

          <div
            id="header-actions"
            class="flex items-center justify-end gap-xl"
          >
            <slot name="header-actions" />
          </div>
        </div>
      </AppContainer>
    </div>

    <AppContainer class="flex flex-1 flex-col overflow-hidden pt-4xl pb-4xl">
      <slot />
    </AppContainer>
  </div>
</template>
