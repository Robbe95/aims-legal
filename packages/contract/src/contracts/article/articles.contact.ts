import {
  clientArticleDetailSchema,
  clientArticleIndexSchema,
  getPaginatedSchema,
  paginationInputSchema,
} from '@repo/models'
import { z } from 'zod'

import { ERROR_NOT_FOUND } from '#errors/errors.ts'
import { publicProcedure } from '#procedures/procedures.ts'

export const getArticleIndex = publicProcedure
  .input(z.object({
    pagination: paginationInputSchema,
    subsiteSlug: z.string(),
  }))
  .output(getPaginatedSchema(clientArticleIndexSchema))

export const getArticleDetailBySlug = publicProcedure
  .input(z.object({
    slug: z.string(),
    subsiteSlug: z.string(),
  }))
  .output(clientArticleDetailSchema)
  .errors({
    ERROR_NOT_FOUND,
  })

export const ARTICLES_CONTRACT = {
  getArticleDetailBySlug,
  getArticleIndex,
}
