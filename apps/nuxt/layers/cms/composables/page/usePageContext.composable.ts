import type { InjectionKey } from 'vue'
import {
  inject,
  provide,
} from 'vue'

import type { ClientBlocks } from '~cms/types/blocks.type'

type PageTheme = 'solid' | 'transparent'
interface PageProviderContext {
  pageTheme: Ref<PageTheme>
}

export const pageProviderContextKey: InjectionKey<PageProviderContext> = Symbol('pageProviderContextKey')

function getPageTheme(firstBlock: ClientBlocks[number] | null): 'solid' | 'transparent' {
  if (!firstBlock) {
    return 'solid'
  }
  if (firstBlock.blockType === 'hero' && firstBlock.variant === 'fullScreen') {
    return 'transparent'
  }

  return 'solid'
}

export function providePageContext(context: {
  blocks: MaybeRefOrGetter<ClientBlocks> | null
}): void {
  const firstBlock = toValue(context.blocks)?.[0] ?? null
  const pageTheme = ref<PageTheme>(getPageTheme(firstBlock))

  provide(
    pageProviderContextKey,
    {
      pageTheme,
    },
  )
}

export function usePageContext(): PageProviderContext {
  const context = inject(pageProviderContextKey, null)

  if (context === null) {
    throw new Error('providePageContext must be called first')
  }

  return {
    pageTheme: context.pageTheme,
  }
}
