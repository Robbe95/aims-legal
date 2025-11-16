import { useOrpcQuery } from '~base/composables/api/useOrpc'
import { useGlobalI18n } from '~base/composables/i18n/useGlobalI18n'
import { useQuery } from '~base/composables/query/useQuery'

export function useGetArticleBySlug({
  slug,
}: { slug: MaybeRefOrGetter<string> }) {
  const orpcQuery = useOrpcQuery()
  const {
    locale,
  } = useGlobalI18n()

  const queryKey = orpcQuery.articles.getArticleDetailBySlug.key({
    input: {
      slug: toValue(slug),
    },
    type: 'query',
  })

  return useQuery(orpcQuery.articles.getArticleDetailBySlug.queryOptions({
    input: {
      slug: toValue(slug),
    },
    queryKey: [
      queryKey,
      locale,
    ],
  }))
}
