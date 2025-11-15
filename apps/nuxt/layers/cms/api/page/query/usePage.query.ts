import { keepPreviousData } from '@tanstack/vue-query'

import { useOrpcQuery } from '~base/composables/api/useOrpc'
import { useGlobalI18n } from '~base/composables/i18n/useGlobalI18n'
import { useQuery } from '~base/composables/query/useQuery'

export function usePageQuery({
  slug, subsiteSlug,
}: { slug: string
  subsiteSlug: string }) {
  const orpcQuery = useOrpcQuery()
  const {
    locale,
  } = useGlobalI18n()

  const queryKey = orpcQuery.pages.getPageBySlug.key({
    input: {
      slug,
      subsiteSlug,
    },
    type: 'query',
  })

  return useQuery(orpcQuery.pages.getPageBySlug.queryOptions({
    staleTime: 5000,
    input: {
      slug,
      subsiteSlug,
    },
    placeholderData: keepPreviousData,
    queryKey: [
      queryKey,
      locale,
    ],
    retry: 0,
  }))
}
