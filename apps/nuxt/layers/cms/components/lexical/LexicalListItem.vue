<script setup lang="ts">
import { VcCheckbox } from '@wisemen/vue-core-components'

import LexicalText from '~cms/components/lexical/LexicalText.vue'
import type { LexicalListItem } from '~cms/models/lexical/lexicalListNode.model.ts'

const props = defineProps<{
  node: LexicalListItem
  type: 'ol' | 'ul'
}>()
</script>

<template>
  <li
    :class="{
      'flex list-none items-center gap-2': node.checked !== undefined,
      'line-through': node.checked,
      '!list-decimal': type === 'ol',
      '!list-disc': type === 'ul',
    }"
    class="text-left"
  >
    <VcCheckbox
      v-if="node.checked !== undefined"
      :is-disabled="true"
      :model-value="node.checked"
    />

    <template
      v-for="(childNode, index) in props.node.children"
      :key="index"
    >
      <LexicalText
        v-if="childNode.type === 'text'"
        :node="childNode"
      />
    </template>
  </li>
</template>
