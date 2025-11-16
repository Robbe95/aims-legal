import type { ClientNavigationDropdown } from '@repo/models'
import type { InjectionKey } from 'vue'
import {
  inject,
  provide,
} from 'vue'

export type DropdownType = 'language' | 'menu' | 'search'

interface NavHeaderProviderContext {
  isTop: ComputedRef<boolean>
  openDropdown: Ref<ClientNavigationDropdown | null>
  openDropdownType: Ref<DropdownType | null>
}

export const navHeaderProviderContextKey: InjectionKey<NavHeaderProviderContext> = Symbol('navHeaderProviderContextKey')

export function provideNavHeaderContext(context: NavHeaderProviderContext): void {
  provide(navHeaderProviderContextKey, context)
}

export function useNavHeaderContext(): NavHeaderProviderContext & { isDropdownOpen: ComputedRef<boolean> } {
  const context = inject(navHeaderProviderContextKey, null)

  if (context === null) {
    throw new Error('provideNavHeaderProviderContext must be called first')
  }

  return {
    isDropdownOpen: computed<boolean>(() => context.openDropdownType.value !== null),
    isTop: context.isTop,
    openDropdown: context.openDropdown,
    openDropdownType: context.openDropdownType,
  }
}
