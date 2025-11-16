/* eslint-disable eslint-plugin-wisemen/explicit-function-return-type-with-regex */
import { getEnv } from '~base/utils/env/getEnv.utils'

async function* fetchAllSitemapEntries(
  baseUrl: string,
  locale: string,
  collection: string,
) {
  let cursor: number | null = null
  let hasMore = true

  while (hasMore) {
    const response: {
      data: any[]
      meta: {
        hasMore: boolean
        cursor: number | null
      }
    } = await $fetch(`${baseUrl}/api/sitemap?locale=${locale}&collection=${collection}${cursor
      ? `&cursor=${cursor}`
      : ''}`) as any

    // Validate response structure
    if (!response || !response.data || !Array.isArray(response.data)) {
      console.error('Invalid response from sitemap API:', response)

      break
    }

    // Yield each entry from this chunk
    if (response.data.length > 0) {
      yield* response.data
    }

    hasMore = response.meta?.hasMore ?? false
    cursor = response.meta?.cursor ?? null
  }
}

export default defineCachedEventHandler(async (event) => {
  // My event handler
  const query = getQuery(event)
  const locale = query.locale || 'en'

  const {
    CMS_BASE_URL,
  } = getEnv()

  const fetchedData: any[] = []

  // Fetch all collections with cursor pagination using streaming
  const collections = [
    'pages',
    'productGroups',
    'productVariants',
  ] as const

  for (const collection of collections) {
    for await (const entry of fetchAllSitemapEntries(CMS_BASE_URL, locale as string, collection)) {
      // Remove _sitemap property as it causes conflicts with chunked sitemaps
      const {
        _sitemap,
        ...entryWithoutSitemap
      } = entry

      fetchedData.push(entryWithoutSitemap)
    }
  }

  return fetchedData
}, {
  base: 'cache',
  getKey: (event) => {
    const query = getQuery(event)
    const locale = query.locale || 'en'

    return `sitemap-${locale}}`
  },
  maxAge: 60 * 60 * 24 * 7,
})
