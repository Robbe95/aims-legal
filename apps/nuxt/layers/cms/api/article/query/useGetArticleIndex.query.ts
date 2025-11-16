import type { PaginationInput } from '@repo/models'
import { useInfiniteQuery } from '@tanstack/vue-query'

import { useOrpcQuery } from '~base/composables/api/useOrpc'
import { useGlobalI18n } from '~base/composables/i18n/useGlobalI18n'

export interface ArticleIndexOptions {
  pagination: MaybeRefOrGetter<PaginationInput>
}

export function useGetArticleIndexQuery() {
  const orpcQuery = useOrpcQuery()
  const {
    locale,
  } = useGlobalI18n()

  const infiniteOptions = orpcQuery.articles.getArticleIndex.infiniteOptions({
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) {
        return
      }

      return {
        skip: lastPage.skip + lastPage.take,
        take: lastPage.take,
      }
    },
    initialPageParam: {
      skip: 0,
      take: 11,
    },

    input: (pageParam: PaginationInput) => ({
      pagination: pageParam,
    }),
  })

  const queryKey = computed<any[]>(() => {
    return [
      infiniteOptions.queryKey,
      locale.value,
    ]
  })

  return useInfiniteQuery({
    ...infiniteOptions,
    queryKey,
  })
}
