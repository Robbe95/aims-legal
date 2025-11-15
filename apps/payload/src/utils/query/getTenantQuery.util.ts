import type { Where } from 'payload'

export function getTenantQuery(tenantId: string): Where {
  return {
    'tenant.id': {
      equals: tenantId,
    },
  }
}
