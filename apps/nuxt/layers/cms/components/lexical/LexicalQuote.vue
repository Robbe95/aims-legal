<script setup lang="ts">
import LexicalText from '~cms/components/lexical/LexicalText.vue'
import type { LexicalQuoteNode } from '~cms/models/lexical/lexicalQuoteNode.model'

const props = defineProps<{
  node: LexicalQuoteNode
}>()
</script>

<template>
  <blockquote class="text-left">
    <span
      v-for="(childNode, index) in props.node.children"
      :key="index"
    >
      <LexicalText :node="childNode" />
    </span>
  </blockquote>
</template>
