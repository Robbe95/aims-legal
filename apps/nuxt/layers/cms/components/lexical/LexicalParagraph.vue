<script setup lang="ts">
import LexicalLinebreak from '~cms/components/lexical/LexicalLinebreak.vue'
import LexicalText from '~cms/components/lexical/LexicalText.vue'
import type { LexicalParagraphNode } from '~cms/models/lexical/lexicalParagraphNode.model'

const props = defineProps<{
  node: LexicalParagraphNode
}>()
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
    <br
      v-if="props.node.children.length === 0"
    >
    <p
      v-else
    >
      <template
        v-for="(child, index) in props.node.children"
        :key="index"
      >
        <LexicalText
          v-if="child.type === 'text'"
          :node="child"
        />
        <LexicalLinebreak v-else-if="child.type === 'linebreak'" />
      </template>
    </p>
  </div>
</template>
