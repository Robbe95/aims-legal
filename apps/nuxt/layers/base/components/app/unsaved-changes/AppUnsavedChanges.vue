<script setup lang="ts">
import { VcIcon, VcSpinner } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  hasUnsavedChanges: boolean
  isAutoSaving: boolean
  autoSaveErrorMessage: string | null
}>()

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-2 items-center">
      <div class="relative size-3">
        <Transition
          enter-active-class="duration-500 absolute ease-bounce"
          leave-active-class="duration-300 absolute"
          enter-from-class="scale-50 opacity-0 -rotate-25 blur-xs"
          leave-to-class="scale-50 opacity-0 rotate-90 blur-xs"
        >
          <VcSpinner
            v-if="props.isAutoSaving || props.hasUnsavedChanges"
          />

          <div
            v-else-if="props.autoSaveErrorMessage !== null"
            class="size-full"
          >
            <VcIcon
              icon="alertCircle"
              class="text-fg-error-primary absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-3.5"
            />
          </div>

          <div
            v-else
            class="size-full"
          >
            <VcIcon
              icon="check"
              class="text-fg-success-primary absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-3.5"
            />
          </div>
        </Transition>
      </div>

      <div class="relative h-4.5 flex">
        <Transition
          :enter-from-class="`opacity-0 blur-[2px] ${props.autoSaveErrorMessage !== null ? 'translate-x-4' : '-translate-x-4'}`"
          :leave-to-class="`opacity-0 blur-[2px] ${props.autoSaveErrorMessage !== null ? '-translate-x-4' : 'translate-x-4'}`"
          enter-active-class="duration-300 absolute"
          leave-active-class="duration-300 absolute"
        >
          <span
            :key="`${props.isAutoSaving}${props.hasUnsavedChanges}`"
            class="inline-block text-secondary text-xs whitespace-nowrap"
          >
            <template v-if="props.isAutoSaving">
              {{ t('base.shared.saving_changes') }}
            </template>

            <template v-else-if="props.hasUnsavedChanges">
              {{ t('shared.base.unsaved_changes') }}
            </template>

            <template v-else-if="props.autoSaveErrorMessage !== null">
              {{ t('shared.base.saving_failed') }}
              {{ `${'&bull;'}` }}
              <span class="font-medium">{{ props.autoSaveErrorMessage }}</span>
            </template>

            <template v-else>
              {{ t('base.shared.all_changes_saved') }}
            </template>
          </span>
        </Transition>
      </div>
    </div>
  </div>
</template>
