<script setup lang="ts">
import LexicalListItem from '~cms/components/lexical/LexicalListItem.vue'
import type { LexicalListNode } from '~cms/models/lexical/lexicalListNode.model'

const props = defineProps<{
  node: LexicalListNode
}>()

function isCheckbox(node: LexicalListNode): boolean {
  return node.children.some((child) => child.type === 'listitem' && child.checked !== undefined)
}
</script>

<template>
  <component
    :is="node.tag"
    :class="{
      'list-none p-0': isCheckbox(props.node),
    }"
  >
    <LexicalListItem
      v-for="(childNode, index) in props.node.children"
      :key="index"
      :type="node.tag"
      :node="childNode"
    />
  </component>
</template>
