import type { UpdateCurrentUserForm } from '@repo/models'
import { useMutation } from '@tanstack/vue-query'

import { useTrpc } from '~base/composables/api/useTrpc'
import { useAuthStore } from '~base/stores/auth.store'

export function useUpdateCurrentUserMutation() {
  const trpc = useTrpc()
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async (updateCurrentUserForm: UpdateCurrentUserForm) => {
      const data = await trpc.auth.updateCurrentUser.mutate(updateCurrentUserForm)

      return data ?? []
    },
    onSuccess(response) {
      authStore.setCurrentUser(response)
    },
  })
}
