import type { Page } from '@repo/payload-types'
import { z } from 'zod'

import { ERROR_NOT_FOUND } from '../../errors/errors'
import { publicProcedure } from '../../procedures/procedures'

export const zodPage = z.custom<Page>((val) => {
  if (typeof val === 'object' && val !== null && 'slug' in val) {
    const slug = (val as { slug: unknown }).slug

    return typeof slug === 'string' && slug.length > 0
  }

  return false
}, {
  message: 'Page is invalid or is missing a valid slug.',
})

const getPageBySlug = publicProcedure
  .route({
    method: 'GET',
  })
  .input(z.object({
    slug: z.string(),
  }))
  .output(zodPage)
  .errors({
    ERROR_NOT_FOUND,
  })

export const PAGES_CONTRACT = {
  getPageBySlug,
}
