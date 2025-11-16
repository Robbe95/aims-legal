/* eslint-disable eslint-plugin-wisemen/explicit-function-return-type-with-regex */
import type { ClientLink } from '@repo/models'
import type { CtaField } from '@repo/payload-types'
import { assert } from '@repo/utils'
import type { RouteLocationNamedI18n } from 'vue-router'
import type { RouteNamedMapI18n } from 'vue-router/auto-routes'

function getPageLink(slug: string) {
  return `/${slug}`.replaceAll('//', '/')
}

function getArticleLink(slug: string) {
  return `/articles/${slug}`.replaceAll('//', '/')
}

type LinkType = ClientLink | CtaField['link']
export type InternalLink = RouteLocationNamedI18n<keyof RouteNamedMapI18n>
export function getInternalLink(link: MaybeRefOrGetter<LinkType | null>): InternalLink | null {
  const internalLink = ref<LinkType | null>(toValue(link))

  if (internalLink.value?.type === 'custom') {
    assert(internalLink.value.url != null, 'URL must exist')

    return internalLink.value.url as InternalLink
  }

  if (internalLink.value?.type !== 'reference' || !internalLink.value?.reference) {
    return null
  }
  if (typeof internalLink.value.reference.value === 'string') {
    return null
  }

  if (internalLink.value.reference.value?.slug == null) {
    return null
  }

  if (internalLink.value?.reference?.relationTo === 'pages') {
    return `${getPageLink(internalLink.value.reference.value.slug)}` as InternalLink
  }

  if (internalLink.value?.reference?.relationTo === 'articles') {
    return `${getArticleLink(internalLink.value.reference.value.slug)}` as InternalLink
  }

  return null
}

export function useInternalLink(
  link: MaybeRefOrGetter<LinkType | null>,
): ComputedRef<InternalLink | null> {
  const internalLink = ref<LinkType | null>(toValue(link))
  const url = computed<InternalLink | null>(() => getInternalLink(internalLink.value))

  return url as ComputedRef<InternalLink | null>
}
