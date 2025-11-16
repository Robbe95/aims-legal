import { useOrpcQuery } from '~base/composables/api/useOrpc'
import { useGlobalI18n } from '~base/composables/i18n/useGlobalI18n'
import { useQuery } from '~base/composables/query/useQuery'

export function useSettingsFooterQuery() {
  const orpcQuery = useOrpcQuery()
  const {
    locale,
  } = useGlobalI18n()

  const queryKey = orpcQuery.settings.getSettingsFooter.key({
    type: 'query',
  })

  return useQuery(
    orpcQuery.settings.getSettingsFooter.queryOptions({
      queryKey: [
        queryKey,
        locale,
      ],
    }),
  )
}
