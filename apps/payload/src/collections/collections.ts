import { articleCollections } from '@payload/collections/articles/article.collections'
import { formCollections } from '@payload/collections/form/form.collections'
import { mediaCollections } from '@payload/collections/medias/media.collections'
import { pageCollections } from '@payload/collections/pages/page.collections'
import { settingsCollections } from '@payload/collections/settings/settings.collections'
import { tenantCollections } from '@payload/collections/tenants/tenant.collections'
import { userCollections } from '@payload/collections/users/user.collections'

export const collections = [
  ...pageCollections,
  ...formCollections,
  ...userCollections,
  ...tenantCollections,
  ...articleCollections,
  ...mediaCollections,
  ...settingsCollections,
]
