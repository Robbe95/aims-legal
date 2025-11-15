import { getArticleDetailBySlug } from '@payload/modules/articles/queries/getArticleDetailBySlug.serverQuery'
import { getArticleIndex } from '@payload/modules/articles/queries/getArticleIndex.serverQuery'
import type { OrpcRouter } from '@payload/orpc/router/orpc.router'

export const articlesRouter: OrpcRouter['articles'] = {
  getArticleDetailBySlug,
  getArticleIndex,
}
