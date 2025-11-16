import type {
  LinkField,
  LinkFieldWithCategories,
} from '@repo/payload-types'

import type { ClientLink } from '#link/link.model.ts'
import { clientLinkSchema } from '#link/link.model.ts'
import type { ClientNavigationLinkWithCategories } from '#navigation-link/navigationLink.model.ts'

export class LinkTransformer {
  static toClientLink(link: LinkField): ClientLink {
    return clientLinkSchema.parse({
      reference: {
        relationTo: link.reference?.relationTo ?? null,
        value: link.reference?.value && typeof link.reference?.value !== 'string'
          ? {
              id: link.reference?.value?.id ?? null,
              slug: link.reference?.value?.slug ?? null,
            }
          : null,
      },

      toNewTab: link.newTab,
      type: link.type,
    })
  }

  static toClientNavigationLinksDropdown({
    label, link,
  }: {
    label: string
    link: LinkFieldWithCategories
  }): ClientNavigationLinkWithCategories {
    const transformedLink = LinkTransformer.toClientLink(link)

    return {
      categories: link.categories?.map((category) => ({
        label: category.label,
        link: LinkTransformer.toClientLink(category.category),
        navType: 'link' as const,
      })) ?? [],
      label,
      link: transformedLink,
      navType: 'linkWithDropdown',
    }
  }
}
