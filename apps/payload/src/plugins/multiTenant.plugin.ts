import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import type { Config } from '@repo/payload-types'

export function pluginMultiTenant() {
  return multiTenantPlugin<Config>({
    collections: {
      articles: {},
      images: {},
      pages: {},
      settingsFooter: {
        isGlobal: true,
      },
      settingsHeader: {
        isGlobal: true,
      },
      settingsHomePage: {
        isGlobal: true,
      },
      settingsHubspot: {
        isGlobal: true,
      },
      settingsSocials: {
        isGlobal: true,
      },
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
