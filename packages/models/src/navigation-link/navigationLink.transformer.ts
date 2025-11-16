import type {
  SettingsFooter,
  SettingsHeader,
} from '@repo/payload-types'

import { LinkTransformer } from '#link/link.transformer.ts'
import type { ClientNavigationLink } from '#navigation-link/navigationLink.model.ts'
import { clientNavigationLinkSchema } from '#navigation-link/navigationLink.model.ts'

export type NavLink = NonNullable<SettingsFooter['links'] | SettingsHeader['links']>[number]
export type DropdownNavLink = NonNullable<NonNullable<NonNullable<SettingsHeader['links']>[number]>['navLink']>

export class NavigationLinkTransformer {
  static toClientNavigationLink(nav: NavLink): ClientNavigationLink {
    const parsedLink = nav.navLink.navType === 'link' && nav.navLink.link ? LinkTransformer.toClientLink(nav.navLink.link) : undefined

    return clientNavigationLinkSchema.parse({
      event: nav.navLink.navType === 'event' && nav.navLink.event != null ? nav.navLink.event : undefined,
      label: nav.navLink.label,
      link: parsedLink,
      links: nav.navLink.navType === 'dropdown' ? nav.navLink.links?.map(LinkTransformer.toClientNavigationLinksDropdown) : undefined,
      navType: nav.navLink.navType,
    })
  }
}
