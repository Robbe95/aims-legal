<script setup lang="ts">
import type { ClientNavigationDropdown } from '@repo/models'
import { VcButton } from '@wisemen/vue-core-components'

import AnimateHeight from '~base/components/animate/AnimateHeight.vue'
import PageNavItemLink from '~cms/components/nav/PageNavItemLink.vue'

defineProps<{
  dropdown: ClientNavigationDropdown
}>()

const emit = defineEmits<{
  back: []
}>()

const {
  t,
} = useI18n()
</script>

<template>
  <div>
    <div class="flex flex-col gap-4 pb-6">
      <AnimateHeight>
        <VcButton
          :class-config="{
            iconLeft: '!size-3 mr-4',
            content: 'text-sm',
          }"
          icon-left="arrowLeft"
          @click="emit('back')"
        >
          {{ t('base.shared.back') }}
        </VcButton>
      </AnimateHeight>

      <p class="text-4xl">
        {{ dropdown.label }}
      </p>
      <PageNavItemLink
        v-for="link in dropdown.links"
        :key="link.label"
        :nav-link="{
          ...link,
          navType: 'link',
        }"
      />
    </div>
  </div>
</template>
