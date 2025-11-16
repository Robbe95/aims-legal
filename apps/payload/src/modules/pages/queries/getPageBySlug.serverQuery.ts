import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { getTenantQuery } from '@payload/utils/query/getTenantQuery.util'
import { FALLBACK_LOCALE } from '@repo/constants'
import type { Page } from '@repo/payload-types'

export const getPageBySlug = publicProcedure.pages.getPageBySlug
  .handler(async ({
    context,
    errors,
    input,
  }) => {
    const payload = await getPayload()

    const paginatedPages = await payload.find({
      collection: 'pages',
      depth: 3,
      fallbackLocale: FALLBACK_LOCALE,
      locale: context.locale,
      where: {
        and: [
          getTenantQuery(context.tenantId),
          {
            slug: {
              equals: input.slug,
            },
          },
        ],
      },
    })

    const foundPage: Page | null = paginatedPages.docs[0]

    if (!foundPage) {
      throw errors.ERROR_NOT_FOUND()
    }

    return foundPage
  })
