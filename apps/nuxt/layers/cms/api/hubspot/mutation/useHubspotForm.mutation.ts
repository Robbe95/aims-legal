import { useMutation } from '@tanstack/vue-query'

import { useOrpcQuery } from '~base/composables/api/useOrpc'

export function useHubspotFormSubmitMutation() {
  const orpcQuery = useOrpcQuery()

  return useMutation({
    ...orpcQuery.hubspot.submitHubspotForm.mutationOptions(),
  })
}
