/* eslint-disable no-console */
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { DEFAULT_LOCALE } from '@repo/constants'
import type { CollectionSlug } from 'payload'

export type MaybePromise<TType> = Promise<TType> | TType
export async function hasOfCollection(collection: CollectionSlug): Promise<boolean> {
  const payload = await getPayload()

  const hasCollection = await payload.find({
    collection,
    depth: 2,
    locale: DEFAULT_LOCALE,
  })

  return hasCollection.docs.length > 0
}

export interface Seeder {
  name: string
  condition: () => MaybePromise<boolean>
  seeder: () => MaybePromise<void>
}
export function createSeeder(
  name: string,
  condition: () => MaybePromise<boolean>,
  seeder: () => MaybePromise<void>,
) {
  return {
    name,
    condition,
    seeder,
  }
}

export async function runSeeder({
  name,
  condition,
  seeder,
}: Seeder) {
  if (await condition()) {
    console.log(`Seeder ${name} already exists, skipping...`)

    return
  }

  console.log(`Seeding ${name}...`)
  await seeder()
  console.log(`Seeding ${name} done`)
}

export function getUniqueRandomValuesFromArray<T>(data: { amount: number
  values: T[] }): T[] {
  const values = data.values
  const amount = data.amount

  const uniqueValues: T[] = []

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * values.length)
    const randomValue = values[randomIndex]

    if (uniqueValues.includes(randomValue)) {
      continue
    }

    uniqueValues.push(randomValue)
  }

  return uniqueValues
}
