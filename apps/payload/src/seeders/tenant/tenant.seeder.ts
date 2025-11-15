import {
  createSeeder,
  hasOfCollection,
} from '@payload/seeders/seeders.util'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { DEFAULT_LOCALE } from '@repo/constants'

export const tenantSeedData = [
  {
    title: 'Default',
  },
]

export const tenantSeeder = createSeeder(
  'tenant',
  async () => await hasOfCollection('tenants'),
  async () => {
    for (const tenant of tenantSeedData) {
      await makeTenant(tenant)
    }
  },
)

export async function makeTenant({
  title,
}: { title: string }) {
  const payload = await getPayload()

  await payload.create({
    collection: 'tenants',
    data: {
      title,
    },
    locale: DEFAULT_LOCALE,
  })
}
