import type { ZodSchema } from 'zod'
import { z } from 'zod'

export const paginationInputSchema = z.object({
  skip: z.number(),
  take: z.number(),
})

export interface PaginationOutput<T> {
  hasNextPage: boolean
  hasPrevPage: boolean
  docs: T[]
  page: number
  skip: number
  take: number
  totalDocs: number
  totalPages: number
}

export function getPaginatedSchema<TSchema extends ZodSchema>(schema: TSchema) {
  return z.object({
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
    docs: z.array(schema),
    page: z.number(),
    skip: z.number(),
    take: z.number(),
    totalDocs: z.number(),
    totalPages: z.number(),
  })
}

export const paginationPayloadSchema = z.object({
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
  docs: z.any().array(),
  limit: z.number(),
  nextPage: z.number().nullish(),
  page: z.number().nullish(),
  pagingCounter: z.number(),
  prevPage: z.number().nullish(),
  totalDocs: z.number(),
  totalPages: z.number(),
})

export type PaginationPayload = z.infer<typeof paginationPayloadSchema>
export type PaginationInput = z.infer<typeof paginationInputSchema>
