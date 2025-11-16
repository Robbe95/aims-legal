<script setup lang="ts">
import LexicalHeading from '~cms/components/lexical/LexicalHeading.vue'
import LexicalHorizontalRule from '~cms/components/lexical/LexicalHorizontalRule.vue'
import LexicalImage from '~cms/components/lexical/LexicalImage.vue'
import LexicalList from '~cms/components/lexical/LexicalList.vue'
import LexicalParagraph from '~cms/components/lexical/LexicalParagraph.vue'
import LexicalQuote from '~cms/components/lexical/LexicalQuote.vue'
import type { LexicalNode } from '~cms/models/lexical/lexicalNode.model'
import { lexicalNodeSchema } from '~cms/models/lexical/lexicalNode.model'

interface RichTextNode {
  [k: string]: unknown
  type: string
  version: number
}

interface RichTextRoot {
  direction: ('ltr' | 'rtl') | null
  format: '' | 'center' | 'end' | 'justify' | 'left' | 'right' | 'start'
  indent: number
  type: string
  version: number
  children: {
    [k: string]: unknown
    type: string
    version: number
  }[]
}

const props = withDefaults(defineProps<{
  root: RichTextRoot
}>(), {})

function validateNode(node: (RichTextNode)): LexicalNode | null {
  try {
    return lexicalNodeSchema.parse(node)
  }
  catch (error) {
    console.error(`Validation failed for node of type "${node.type}":`, error)
    console.error(node)

    return null
  }
}

const validatedNodes = computed<LexicalNode[]>(() => {
  const nodes = props.root?.children

  if (!nodes) {
    return []
  }

  const validChildren = nodes
    .map(validateNode)
    .filter((node: any): node is LexicalNode => node !== null)

  return validChildren
})

function getPreviousNode(index: number): LexicalNode | null {
  if (index === 0) {
    return null
  }

  return validatedNodes.value[index - 1] || null
}

function getPreviousNodeFormat(node: LexicalNode): '' | 'center' | 'end' | 'justify' | 'left' | 'right' | 'start' {
  const previousNode = getPreviousNode(validatedNodes.value.indexOf(node))

  if (!previousNode) {
    return ''
  }

  if (previousNode.type !== 'paragraph' && previousNode.type !== 'heading') {
    return ''
  }

  return previousNode.format ?? ''
}
</script>

<template>
  <div
    class="flex !w-full !max-w-full flex-col"
  >
    <template v-if="validatedNodes.length > 0">
      <div
        v-for="(node, i) in validatedNodes"
        :key="i"
      >
        <LexicalParagraph
          v-if="node.type === 'paragraph'"
          :node="node"
        />
        <LexicalList
          v-else-if="node.type === 'list'"
          :node="node"
        />
        <LexicalImage
          v-else-if="node.type === 'upload'"
          :node="node"
          :format="getPreviousNodeFormat(node)"
        />
        <LexicalHeading
          v-else-if="node.type === 'heading'"
          :node="node"
        />
        <LexicalQuote
          v-else-if="node.type === 'quote'"
          :node="node"
        />
        <LexicalHorizontalRule
          v-else-if="node.type === 'horizontalrule'"
          :node="node"
        />
        <span
          v-else
          class="border p-2"
        />
      </div>
    </template>
  </div>
</template>
