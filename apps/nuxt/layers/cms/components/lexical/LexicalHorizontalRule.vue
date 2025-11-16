<script setup lang="ts">
import Seperator from '~base/components/seperator/Seperator.vue'
import type { LexicalHorizontalRuleNode } from '~cms/models/lexical/lexicalHorizontalRuleNode.model'

defineProps<{
  node: LexicalHorizontalRuleNode
}>()
</script>

<template>
  <Seperator class="w-full" />
</template>
