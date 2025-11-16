import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { ContractRouterClient } from '@orpc/contract'
import { createORPCVueQueryUtils } from '@orpc/vue-query'
import type { ORPC_CONTRACT } from '@repo/contract'

import { useGlobalI18n } from '~base/composables/i18n/useGlobalI18n'
import { getEnv } from '~base/utils/env/getEnv.utils'

export function useOrpc() {
  const {
    CMS_BASE_URL,
  } = getEnv()
  const {
    locale,
  } = useGlobalI18n()

  const link = new RPCLink({
    headers(): Record<string, string> {
      const headers: Record<string, string> = {}

      headers['Accept-Language'] = locale.value

      return headers
    },
    url: `${CMS_BASE_URL}/api/rpc`,
  })

  const client: ContractRouterClient<typeof ORPC_CONTRACT> = createORPCClient(link)

  return client
}

export function useOrpcQuery() {
  const orpc = useOrpc()
  const orpcQuery = createORPCVueQueryUtils(orpc)

  return orpcQuery
}
