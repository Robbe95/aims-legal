import {
  createTRPCProxyClient,
  httpBatchLink,
} from '@trpc/client'
import type { AppRouter } from '@trpc-router'

import { useGlobalI18n } from '~base/composables/i18n/useGlobaI18n'
import { useAuthStore } from '~base/stores/auth.store'
import { getEnv } from '~base/utils/env/getEnv.utils'

async function handleAuth(headers: Record<string, string>) {
  const authStore = useAuthStore()
  const oAuthClient = useNuxtApp().$oAuthClient

  const isLoggedIn = await oAuthClient.isLoggedIn()

  if (isLoggedIn) {
    try {
      const token = await authStore.getToken()

      headers.Authorization = `Bearer ${token}`
    }
    catch {
      authStore.logout()
    }
  }

  return headers
}

export function useTrpc() {
  const { CMS_BASE_URL } = getEnv()
  const { locale } = useGlobalI18n()

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        async headers() {
          let headers: Record<string, string> = {}

          headers['Accept-Language'] = locale.value

          headers = await handleAuth(headers)

          return headers
        },
        url: `${CMS_BASE_URL}/api/trpc`,
      }),
    ],
  })

  return client
}
