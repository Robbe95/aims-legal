<script setup lang="ts">
import type { Component } from 'vue'

import SectionHeader from '~base/components/section/SectionHeader.vue'
import SectionSubHeader from '~base/components/section/SectionSubHeader.vue'
import SectionTitle from '~base/components/section/SectionTitle.vue'
import LexicalText from '~cms/components/lexical/LexicalText.vue'
import type { LexicalHeadingNode } from '~cms/models/lexical/lexicalHeadingNode.model'

const props = defineProps<{
  node: LexicalHeadingNode
}>()

const headingComponent = computed<Component>(() => {
  switch (props.node.tag) {
    case 'h1':
      return SectionTitle

    case 'h2':
      return SectionHeader

    case 'h3':
      return SectionSubHeader

    default:
      return SectionSubHeader
  }
})
</script>

<template>
  <div
    :class="{
      'items-center justify-center text-center': props.node.format === 'center',
      'items-end justify-end text-right': props.node.format === 'right'
        || props.node.format === 'end',
      'items-start justify-start text-left': props.node.format === 'left'
        || props.node.format === 'start' || props.node.format === '',
    }"
    class="flex w-full flex-col"
  >
    <component :is="headingComponent">
      <LexicalText
        v-for="(childNode, index) in props.node.children"
        :key="index"
        :is-title="true"
        :node="childNode"
      />
    </component>
  </div>
</template>
