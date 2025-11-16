import { createContext } from '@payload/orpc/context/context'
import type { MiddlewareContextParameter } from '@payload/orpc/orpc'
import { ORPC_BASE_LOCALE } from '@payload/orpc/orpc'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import {
  DEFAULT_LOCALE,
  localeSchema,
} from '@repo/constants'

export async function contextServerMiddleware({
  context, next,
}: MiddlewareContextParameter) {
  const locale = localeSchema.parse(context['Accept-Language'] ?? ORPC_BASE_LOCALE)
  const TENANT_NAME = 'Default'

  const runtimeContext = createContext({
    locale,
    token: context.Authorization ?? null,
  })

  const payload = await getPayload()

  const defaultTenant = await payload.find({
    collection: 'tenants',
    depth: 0,
    fallbackLocale: DEFAULT_LOCALE,
    locale: DEFAULT_LOCALE,
    overrideAccess: true,
    where: {
      title: {
        equals: TENANT_NAME,
      },
    },
  })

  const firstTenant = defaultTenant.docs[0]

  if (!firstTenant) {
    throw new Error('Tenant not found')
  }

  return next({
    context: {
      tenantId: firstTenant.id,
      locale: runtimeContext.locale,
      token: runtimeContext.token,
      user: runtimeContext.user,
    },
  })
}
