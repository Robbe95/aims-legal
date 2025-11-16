<script setup lang="ts">
import Container from '~~/layers/base/components/container/Container.vue'

interface Props {
  isFirstBlock?: boolean
  noPadding?: boolean
}

withDefaults(defineProps<Props>(), {
  isFirstBlock: false,
  noPadding: false,
})

const pageElement = useTemplateRef('pageElement')
</script>

<template>
  <section
    ref="pageElement"
    :class="{
      'pt-40': isFirstBlock,
    }"
    class="overflow-hidden py-20"
  >
    <Container :no-padding="noPadding">
      <slot />
    </Container>
  </section>
</template>
