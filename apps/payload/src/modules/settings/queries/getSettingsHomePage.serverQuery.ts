import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { getTenantQuery } from '@payload/utils/query/getTenantQuery.util'
import { FALLBACK_LOCALE } from '@repo/constants'
import { LinkTransformer } from '@repo/models'

export const getSettingsHomepage = publicProcedure.settings.getSettingsHomepage
  .handler(async ({
    context,
  }) => {
    const payload = await getPayload()

    const paginatedHomePages = await payload.find({
      collection: 'settingsHomePage',
      fallbackLocale: FALLBACK_LOCALE,
      locale: context.locale,
      where: {
        ...getTenantQuery(context.tenantId),
      },
    })

    const foundHomePage = paginatedHomePages.docs[0]

    return foundHomePage.homePage != null
      ? LinkTransformer.toClientLink(foundHomePage.homePage)
      : null
  })
