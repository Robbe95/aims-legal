import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import {
  hubspotFormDtoSchema,
  HubspotFormTransformer,
} from '@repo/models'
import { zodSafeParse } from '@repo/utils'

export const getHubspotFormById = publicProcedure.hubspot.getHubspotFormById
  .handler(async ({
    errors, input,
  }) => {
    const payload = await getPayload()
    const globalSettings = await payload.findGlobal({
      slug: 'settings',
    })

    const hubspotAccessToken = globalSettings.hubspot?.accessToken
    const hubspotPortalId = globalSettings.hubspot?.portalId

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

      const parsedHubspotForm = zodSafeParse(
        {
          data: hubspotFormResponse,
          schema: hubspotFormDtoSchema,
        },
      )

      return HubspotFormTransformer.toClientHubspotForm(parsedHubspotForm)
    }
    catch (error) {
      console.error('Error fetching Hubspot form:', error)

      throw errors.ERROR_NOT_FOUND({
        message: 'Hubspot form not found',
      })
    }
  })
