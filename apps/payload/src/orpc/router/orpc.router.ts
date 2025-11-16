import { articlesRouter } from '@payload/modules/articles/articles.router'
import { authRouter } from '@payload/modules/auth/auth.router'
import { hubspotRouter } from '@payload/modules/hubspot/hubspot.router'
import { pagesRouter } from '@payload/modules/pages/pages.router'
import { settingsRouter } from '@payload/modules/settings/settings.router'
import { orpc } from '@payload/orpc/orpc'

export const orpcRouter = orpc.router({
  articles: articlesRouter,
  auth: authRouter,
  hubspot: hubspotRouter,
  pages: pagesRouter,
  settings: settingsRouter,

})

export type OrpcRouter = typeof orpc.router extends (input: infer T) => any ? T : never
