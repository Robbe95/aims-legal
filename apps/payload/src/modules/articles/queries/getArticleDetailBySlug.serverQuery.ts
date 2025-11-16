import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { getTenantQuery } from '@payload/utils/query/getTenantQuery.util'
import { FALLBACK_LOCALE } from '@repo/constants'
import { ArticleTransformer } from '@repo/models'
import type { Article } from '@repo/payload-types'

export const getArticleDetailBySlug = publicProcedure.articles.getArticleDetailBySlug
  .handler(async ({
    context,
    errors,
    input,
  }) => {
    const payload = await getPayload()

    const articles = await payload.find({
      collection: 'articles',
      depth: 2,
      fallbackLocale: FALLBACK_LOCALE,
      limit: 20,
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

    const foundArticle: Article | null = articles.docs[0]

    if (!foundArticle) {
      throw errors.ERROR_NOT_FOUND({
        message: 'Article not found',
      })
    }

    try {
      return ArticleTransformer.toClientArticleDetail(foundArticle)
    }
    catch (error) {
      console.error(error)

      throw errors
    }
  })
