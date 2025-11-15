import { tenantSeeder } from '@payload/seeders/tenant/tenant.seeder'

import type { Seeder } from './seeders.util'
import { runSeeder } from './seeders.util'

export const seeders: Seeder[] = [
  tenantSeeder,
]

export async function runSeeders() {
  for (const seeder of seeders) {
    await runSeeder(seeder)
  }
}
