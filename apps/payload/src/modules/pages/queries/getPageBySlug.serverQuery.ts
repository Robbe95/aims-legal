import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getFallbackLocaleOfSlugCollection } from '@payload/utils/locale/getFallbackLocaleOfSlugCollection.util'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { getSubsiteQueryBySlug } from '@payload/utils/query/getSubsiteQuery.util'
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
      populate: {
        productGroups: {
          title: true,
          assets: true,
          slug: true,
          subsite: true,
        },
        subsites: {
          title: true,
          slug: true,
        },
      },
      where: {
        and: [
          getTenantQuery(context.tenantId),
          getSubsiteQueryBySlug(input.subsiteSlug),
          {
            slug: {
              equals: input.slug,
            },
          },
        ],
      },
    })

    let foundPage: Page | null = paginatedPages.docs[0]

    if (!foundPage) {
      foundPage = await getFallbackLocaleOfSlugCollection({
        tenantId: context.tenantId,
        collection: 'pages',
        slug: input.slug,
        subsiteSlug: input.subsiteSlug,
      })
    }

    if (!foundPage) {
      throw errors.ERROR_NOT_FOUND()
    }

    return foundPage
  })
