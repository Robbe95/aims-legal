import { useOrpcQuery } from '~base/composables/api/useOrpc'
import { useGlobalI18n } from '~base/composables/i18n/useGlobalI18n'
import { useQuery } from '~base/composables/query/useQuery'

export function useSettingsHeaderQuery() {
  const orpcQuery = useOrpcQuery()
  const {
    locale,
  } = useGlobalI18n()

  const queryKey = orpcQuery.settings.getSettingsHeader.key({
    type: 'query',
  })

  return useQuery(
    orpcQuery.settings.getSettingsHeader.queryOptions({
      queryKey: [
        queryKey,
        locale,
      ],
    }),
  )
}
