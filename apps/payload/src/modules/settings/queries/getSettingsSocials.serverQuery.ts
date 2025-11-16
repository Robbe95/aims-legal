import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { getTenantQuery } from '@payload/utils/query/getTenantQuery.util'
import { FALLBACK_LOCALE } from '@repo/constants'

export const getSettingsSocials = publicProcedure.settings.getSettingsSocials
  .handler(async ({
    context,
  }) => {
    const payload = await getPayload()

    const paginatedSocials = await payload.find({
      collection: 'settingsSocials',
      fallbackLocale: FALLBACK_LOCALE,
      locale: context.locale,
      where: {
        ...getTenantQuery(context.tenantId),
      },
    })

    const foundSocials = paginatedSocials.docs[0]

    return {
      facebook: foundSocials?.facebook ?? null,
      instagram: foundSocials?.instagram ?? null,
      linkedin: foundSocials?.linkedin ?? null,
      pinterest: foundSocials?.pinterest ?? null,
      tiktok: foundSocials?.tiktok ?? null,
      youtube: foundSocials?.youtube ?? null,
    }
  })
