<script setup lang="ts">
import Container from '~~/layers/base/components/container/Container.vue'
import type { InternalLink } from '~~/layers/cms/composables/link/useInternalLink.composable'
import Seperator from '~base/components/seperator/Seperator.vue'
import CmsLink from '~cms/components/link/CmsLink.vue'

export interface Breadcrumb {
  link?: InternalLink | null
  text: string
}
interface Props {
  breadcrumbs: Breadcrumb[]
  theme?: 'dark' | 'light'
}
const props = withDefaults(defineProps<Props>(), {
  theme: 'dark',
})
</script>

<template>
  <Container>
    <div
      class="
        flex flex-col text-sm
        lg:flex-row lg:items-center lg:gap-6
      "
    >
      <template
        v-for="(breadcrumb, index) in props.breadcrumbs"
        :key="index"
      >
        <CmsLink
          v-if="breadcrumb.link"
          :url="breadcrumb.link"
          :class="{
            'text-black/60': index < props.breadcrumbs.length - 1 && props.theme === 'dark',
            'text-black underline': index === props.breadcrumbs.length - 1 && props.theme === 'dark',
            'text-white/60': index < props.breadcrumbs.length - 1 && props.theme === 'light',
            'text-white underline': index === props.breadcrumbs.length - 1 && props.theme === 'light',
          }"
          class="
            font-kreon font-thin lowercase
            hover:underline
            focus:underline
          "
        >
          {{ breadcrumb.text }}
        </CmsLink>
        <span
          v-else
          :class="{
            'text-black/60': index < props.breadcrumbs.length - 1 && props.theme === 'dark',
            'text-black underline': index === props.breadcrumbs.length - 1 && props.theme === 'dark',
            'text-white/60': index < props.breadcrumbs.length - 1 && props.theme === 'light',
            'text-white underline': index === props.breadcrumbs.length - 1 && props.theme === 'light',
          }"
          class="font-kreon font-thin lowercase"
        >
          {{ breadcrumb.text }}
        </span>
        <Seperator
          v-if="index < props.breadcrumbs.length - 1"
          direction="vertical"
          class="my-0.5 self-stretch bg-gray-500"
        />
      </template>
    </div>
  </Container>
</template>
