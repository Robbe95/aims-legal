import { articlesRouter } from '@payload/modules/articles/articles.router'
import { assetsRouter } from '@payload/modules/assets/assets.router'
import { authRouter } from '@payload/modules/auth/auth.router'
import { downloadRouter } from '@payload/modules/download/download.router'
import { hubspotRouter } from '@payload/modules/hubspot/hubspot.router'
import { locationRouter } from '@payload/modules/location/location.router'
import { pagesRouter } from '@payload/modules/pages/pages.router'
import { personRouter } from '@payload/modules/person/person.router'
import { productRouter } from '@payload/modules/product/product.router'
import { projectsRouter } from '@payload/modules/projects/projects.router'
import { searchRouter } from '@payload/modules/search/search.router'
import { settingsRouter } from '@payload/modules/settings/settings.router'
import { slugsRouter } from '@payload/modules/slugs/slugs.router'
import { subsitesRouter } from '@payload/modules/subsites/subsites.router'
import { orpc } from '@payload/orpc/orpc'

export const orpcRouter = orpc.router({
  articles: articlesRouter,
  assets: assetsRouter,
  auth: authRouter,
  download: downloadRouter,
  hubspot: hubspotRouter,
  location: locationRouter,
  pages: pagesRouter,
  person: personRouter,
  product: productRouter,
  projects: projectsRouter,
  search: searchRouter,
  settings: settingsRouter,
  slugs: slugsRouter,
  subsite: subsitesRouter,
})

export type OrpcRouter = typeof orpc.router extends (input: infer T) => any ? T : never
