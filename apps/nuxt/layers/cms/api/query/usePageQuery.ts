import { useOrpc } from '~base/composables/api/useOrpc'
import { useGlobalI18n } from '~base/composables/i18n/useGlobaI18n'
import { useQuery } from '~base/composables/query/useQuery'
import { pageQueryKey } from '~root/layers/cms/api/query-key/page.queryKey'

export function usePageQuery({ slug }: { slug: string }) {
  const orpc = useOrpc()
  const { locale } = useGlobalI18n()

  return useQuery({
    queryFn: async () => {
      const data = await orpc.pages.getPageBySlug({ slug })

      return data
    },
    queryKey: [
      pageQueryKey.detail(slug).queryKey,
      locale,
    ],
  })
}
