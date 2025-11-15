import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { getTenantQuery } from '@payload/utils/query/getTenantQuery.util'
import {
  ArticleTransformer,
  PaginationTransformer,
} from '@repo/models'

export const getArticleIndex = publicProcedure.articles.getArticleIndex
  .handler(async ({
    context, input,
  }) => {
    const payload = await getPayload()

    const {
      pagination,
    } = input

    const page = Math.floor(pagination.skip / pagination.take) + 1
    const paginatedArticles = await payload.find({
      collection: 'articles',
      depth: 1,
      fallbackLocale: false,
      limit: pagination.take,
      locale: context.locale,
      page,
      select: {
        id: true,
        _status: true,
        preview: true,
        slug: true,
      },
      where: {
        and: [
          {
            title: {
              exists: true,
            },
            _status: {
              equals: 'published',
            },
            slug: {
              exists: true,
            },

          },

          getTenantQuery(context.tenantId),

        ],
      },
    })

    const parsedArticles = paginatedArticles.docs.map((article) => ArticleTransformer.toClientArticleIndex(article))

    return PaginationTransformer.toPaginationOutput({
      data: parsedArticles,
      pagination: paginatedArticles,
    })
  })
