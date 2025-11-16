import { useOrpcQuery } from '~base/composables/api/useOrpc'
import { useGlobalI18n } from '~base/composables/i18n/useGlobalI18n'
import { useQuery } from '~base/composables/query/useQuery'

export function useHubspotFormQuery({
  formId,
}: { formId: MaybeRefOrGetter<string> }) {
  const orpcQuery = useOrpcQuery()
  const {
    locale,
  } = useGlobalI18n()

  const queryKey = orpcQuery.hubspot.getHubspotFormById.key({
    input: {
      formId: toValue(formId),
    },
    type: 'query',
  })

  return useQuery({
    isClientOnly: true,
    ...orpcQuery.hubspot.getHubspotFormById.queryOptions({
      input: {
        formId: toValue(formId),
      },
      queryKey: [
        queryKey,
        locale,
      ],
    }),
  })
}
