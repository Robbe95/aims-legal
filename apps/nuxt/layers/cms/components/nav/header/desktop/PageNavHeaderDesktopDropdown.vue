<script setup lang="ts">
import type { ClientNavigationLinkWithCategories } from '@repo/models'

import PageNavHeaderDesktopDropdownSubLink from '~~/layers/cms/components/nav/header/desktop/PageNavHeaderDesktopDropdownSubLink.vue'
import PageNavHeaderDesktopDropdownLink from '~cms/components/nav/header/desktop/PageNavHeaderDesktopDropdownLink.vue'
import { useNavHeaderContext } from '~cms/composables/nav/useNavHeaderContext.composable'

const context = useNavHeaderContext()
const {
  t,
} = useI18n()

const links = computed<ClientNavigationLinkWithCategories[]>(() => {
  return (context.openDropdown.value?.links ?? []) as ClientNavigationLinkWithCategories[]
})

const lastHovered = ref<ClientNavigationLinkWithCategories | null>(null)

function onHover(link: ClientNavigationLinkWithCategories): void {
  lastHovered.value = link
}
</script>

<template>
  <div
    class="
      fixed top-(--dropdown-spacing) left-0 z-50 w-screen bg-white duration-200
      ease-in-out
    "
  >
    <div class="container mx-auto flex justify-between px-sm py-6xl">
      <div class="flex flex-col gap-3xl">
        <PageNavHeaderDesktopDropdownLink
          v-for="link in links"
          :key="link.label"
          :link="link.link"
          :is-last-hovered="lastHovered?.label === link.label"
          :label="link.label"
          @mouseenter="onHover(link)"
          @focus="onHover(link)"
        />
      </div>
      <div
        v-if="lastHovered?.categories?.length && lastHovered?.categories?.length > 0"
        class="flex gap-12"
      >
        <p>
          {{ `${t('cms.header.category')}:` }}
        </p>
        <div class="flex flex-col gap-6 text-sm">
          <PageNavHeaderDesktopDropdownSubLink
            v-for="link in lastHovered?.categories ?? []"
            :key="`${link.label}-${lastHovered.label}`"
            :link="link.link"
            :label="link.label"
          />
        </div>
      </div>
    </div>
  </div>
</template>
