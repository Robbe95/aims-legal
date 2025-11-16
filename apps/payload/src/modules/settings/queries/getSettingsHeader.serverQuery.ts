import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { getTenantQuery } from '@payload/utils/query/getTenantQuery.util'
import { FALLBACK_LOCALE } from '@repo/constants'
import { NavigationLinkTransformer } from '@repo/models'

export const getSettingsHeader = publicProcedure.settings.getSettingsHeader
  .handler(async ({
    context,
  }) => {
    const payload = await getPayload()

    const paginatedHeaders = await payload.find({
      collection: 'settingsHeader',
      fallbackLocale: FALLBACK_LOCALE,
      locale: context.locale,
      where: {
        ...getTenantQuery(context.tenantId),
      },
    })

    const foundHeader = paginatedHeaders.docs[0]

    return {
      headerLinks: foundHeader?.links?.map(NavigationLinkTransformer.toClientNavigationLink) ?? [],
    }
  })
