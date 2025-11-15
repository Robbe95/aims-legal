import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import type { Config } from '@repo/payload-types'

export function pluginMultiTenant() {
  return multiTenantPlugin<Config>({
    collections: {
      articles: {},
      images: {},
      pages: {},
    },
    enabled: true,
    tenantField: {
      access: {
        read: () => true,
        update: () => true,
      },
    },
    tenantsArrayField: {
      includeDefaultField: false,
    },
    tenantSelectorLabel: 'Site',
    userHasAccessToAllTenants: (user) => {
      return user.role === 'super-admin'
    },
  })
}
