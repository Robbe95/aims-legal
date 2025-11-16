import type { Article } from '@repo/payload-types'
import { assert } from '@repo/utils'

import type { ClientArticleDetail } from '#article/articleDetail.model.ts'
import type { ClientArticleIndex } from '#article/articleIndex.model.ts'
import { ImageTransformer } from '#image/image.transformer.ts'
import { SeoTransformer } from '#seo/seo.transformer.ts'

export const ArticleTransformer = {
  toClientArticleDetail(article: Article): ClientArticleDetail {
    if (typeof article.preview.image === 'string') {
      throw new TypeError('Image value is not an object, depth should be increased')
    }

    if (article.blocks == null) {
      throw new TypeError('Blocks value is not an object, depth should be increased')
    }

    if (article.slug == null) {
      throw new TypeError('Slug is required')
    }

    const clientArticleDetail: ClientArticleDetail = {
      id: article.id,
      title: article.title,
      blocks: article.blocks,
      preview: {
        title: article.preview.title,
        description: article.preview.description ?? null,
        image: ImageTransformer.toClientImage(article.preview.image),
      },
      seo: SeoTransformer.toClientSeo(article.seo),
      slug: article.slug,
    }

    return clientArticleDetail
  },
  toClientArticleIndex(article: Pick<Article, 'id' | 'preview' | 'slug'>): ClientArticleIndex {
    assert(typeof article.preview.image !== 'string', 'Image value is not an object, depth should be increased')
    assert(article.slug != null, 'Slug is required')

    const clientArticleIndex: ClientArticleIndex = {
      id: article.id,
      preview: {
        title: article.preview.title,
        description: article.preview.description ?? null,
        image: ImageTransformer.toClientImage(article.preview.image),
      },
      slug: article.slug,
    }

    return clientArticleIndex
  },

}
