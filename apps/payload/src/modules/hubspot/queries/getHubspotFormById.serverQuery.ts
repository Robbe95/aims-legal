import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { getTenantQuery } from '@payload/utils/query/getTenantQuery.util'
import {
  hubspotFormDtoSchema,
  HubspotFormTransformer,
} from '@repo/models'

export const getHubspotFormById = publicProcedure.hubspot.getHubspotFormById
  .handler(async ({
    context,
    errors,
    input,
  }) => {
    const payload = await getPayload()
    const settingsHubspot = await payload.find({
      collection: 'settingsHubspot',
      where: {
        ...getTenantQuery(context.tenantId),
      },
    })

    const hubspotAccessToken = settingsHubspot.docs[0]?.accessToken
    const hubspotPortalId = settingsHubspot.docs[0]?.portalId

    if (hubspotAccessToken == null || hubspotPortalId == null) {
      throw errors.ERROR_BAD_REQUEST({
        message: 'Hubspot access token or portal ID is not set in the settings',
      })
    }

    try {
      const response = await fetch(`https://api.hubapi.com/marketing/v3/forms/${input.formId}`, {
        headers: {
          'Authorization': `Bearer ${hubspotAccessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
      const hubspotFormResponse = await response.json()

      const parsedHubspotForm = hubspotFormDtoSchema.parse(hubspotFormResponse)

      return HubspotFormTransformer.toClientHubspotForm(parsedHubspotForm)
    }
    catch (error) {
      console.error('Error fetching Hubspot form:', error)

      throw errors.ERROR_NOT_FOUND({
        message: 'Hubspot form not found',
      })
    }
  })
