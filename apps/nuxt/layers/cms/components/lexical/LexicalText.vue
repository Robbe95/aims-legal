<script setup lang="ts">
import type { LexicalTextNode } from '~cms/models/lexical/lexicalTextNode.model'
import { hasFormat } from '~cms/models/lexical/lexicalTextNode.model'

const props = defineProps<{
  isTitle?: boolean
  node: LexicalTextNode
}>()

const textComponent = computed<string>(() => {
  switch (props.node.format) {
    case 0:
      return 'span'

    case 1:
      return 'strong'

    default:
      return 'span'
  }
})

const hasBold = computed<boolean>(() => {
  return hasFormat('bold', props.node.format)
})

const _hasCapitalize = computed<boolean>(() => {
  return hasFormat('capitalize', props.node.format)
})

const _hasCode = computed<boolean>(() => {
  return hasFormat('code', props.node.format)
})

const _hasHighlight = computed<boolean>(() => {
  return hasFormat('highlight', props.node.format)
})

const hasItalic = computed<boolean>(() => {
  return hasFormat('italic', props.node.format)
})

const hasLowercase = computed<boolean>(() => {
  return hasFormat('lowercase', props.node.format)
})

const hasStrikethrough = computed<boolean>(() => {
  return hasFormat('strikethrough', props.node.format)
})

const hasSubscript = computed<boolean>(() => {
  return hasFormat('subscript', props.node.format)
})

const hasSuperscript = computed<boolean>(() => {
  return hasFormat('superscript', props.node.format)
})

const hasUnderline = computed<boolean>(() => {
  return hasFormat('underline', props.node.format)
})

const hasUppercase = computed<boolean>(() => {
  return hasFormat('uppercase', props.node.format)
})
</script>

<template>
  <div
    class="max-w-4xl"
  >
    <component
      :is="textComponent"
      :class="{
        'font-bold': hasBold,
        'capitalize': _hasCapitalize,
        'italic': hasItalic,
        'lowercase': hasLowercase,
        'line-through': hasStrikethrough,
        'text-xs': hasSubscript || hasSuperscript,
        'font-light': !hasBold && !isTitle,
        'underline': hasUnderline,
        'uppercase': hasUppercase,
      }"
      :style="{
        verticalAlign: hasSuperscript ? 'super' : hasSubscript
          ? 'sub' : ''
        ,
      }"
    >
      {{ props.node.text }}
    </component>
  </div>
</template>
