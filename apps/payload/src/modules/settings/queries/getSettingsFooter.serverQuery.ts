import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { getTenantQuery } from '@payload/utils/query/getTenantQuery.util'
import { FALLBACK_LOCALE } from '@repo/constants'
import { NavigationLinkTransformer } from '@repo/models'

export const getSettingsFooter = publicProcedure.settings.getSettingsFooter
  .handler(async ({
    context,
  }) => {
    const payload = await getPayload()

    const paginatedFooters = await payload.find({
      collection: 'settingsFooter',
      fallbackLocale: FALLBACK_LOCALE,
      locale: context.locale,
      where: {
        ...getTenantQuery(context.tenantId),
      },
    })

    const foundFooter = paginatedFooters.docs[0]

    return foundFooter?.links?.map(NavigationLinkTransformer.toClientNavigationLink) ?? []
  })
