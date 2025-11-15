/* eslint-disable max-depth */
'use client'
import { LightIcon } from '@payload/components/lexical/light/lightIcon'
import type { ToolbarGroup } from '@payloadcms/richtext-lexical'
import {
  createClientFeature,
  toolbarFormatGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import type { EditorConfig } from 'lexical'
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  createCommand,
  TextNode,
} from 'lexical'

export const TOGGLE_LIGHT_COMMAND = createCommand()

export class LightTextNode extends TextNode {
  static clone(node: LightTextNode): LightTextNode {
    return new LightTextNode(node.__text, node.__key)
  }

  static getType(): string {
    return 'light-text-node'
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config)

    element.style.fontWeight = '300'

    return element
  }

  isLightTextNode(): boolean {
    return true
  }

  updateDOM(prevNode: LightTextNode, dom: HTMLElement, config: EditorConfig): boolean {
    return super.updateDOM(this, dom, config)
  }
}

function $isLightTextNode(node: unknown | null | undefined): node is LightTextNode {
  return node instanceof LightTextNode
}

const toolbarGroups: ToolbarGroup[] = [
  toolbarFormatGroupWithItems([
    {
      isActive: ({
        selection,
      }) => {
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes()

          if (nodes.length > 0) {
            return nodes?.every((node) => $isTextNode(node) && $isLightTextNode(node))
          }
        }

        return false
      },
      ChildComponent: LightIcon,
      key: 'light',
      order: 1,
      onSelect: ({
        editor,
      }) => {
        editor.update(() => {
          const selection = $getSelection()

          if ($isRangeSelection(selection)) {
            const nodes = selection.getNodes()

            if (nodes.length > 0) {
              const isLight = nodes?.every((node) => $isTextNode(node) && $isLightTextNode(node))

              if (isLight) {
                // If the selection is already light, un-style it by replacing the node
                for (const node of nodes) {
                  if ($isTextNode(node)) {
                    node.replace(TextNode.clone(node))
                  }
                }
              }
              else {
                // If not light, apply the style by replacing the node
                for (const node of nodes) {
                  if ($isTextNode(node)) {
                    node.replace(new LightTextNode(node.getTextContent()))
                  }
                }
              }
            }
          }
        })
      },
    },
  ]),
]

export const LightFeatureClient = createClientFeature(() => {
  return {
    markdownTransformers: [],
    toolbarFixed: {
      groups: toolbarGroups,
    },
    toolbarInline: {
      groups: toolbarGroups,
    },
  }
})
