import { publicProcedure } from '@payload/orpc/procedures/public.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'

const LEGAL_CONSENT_HUBSPOT = {
  consent: {
    // Include this object when GDPR options are enabled
    // communications: [
    //   {
    //     subscriptionTypeId: 999,
    //     text: 'I agree to receive marketing communications from Example Company.',
    //     value: true,
    //   },
    // ],
    consentToProcess: true,
    text: 'I agree to allow Example Company to store and process my personal data.',
  },
}

function convertValueToHubspotApi(value: any | any[]): any {
  if (Array.isArray(value)) {
    return value.join('; ')
  }

  return value
}

export const submitHubspotForm = publicProcedure.hubspot.submitHubspotForm
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
      /**
       * Hubspot field example
       * {
       *   "objectTypeId": "0-1",
       *   "name": "email",
       *   "value": "test@test.com"
       * }
       */
      const hubspotFields = Object.entries(input.data).map(([
        key,
        value,
      ]) => ({
        objectTypeId: value.objectTypeId,
        name: key,
        value: convertValueToHubspotApi(value.value),
      }))

      const hubspotBody = {
        portalId: hubspotPortalId,
        submittedAt: Date.now(),
        fields: hubspotFields,
        legalConsentOptions: LEGAL_CONSENT_HUBSPOT,
      }

      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${input.formId}`, {
        body: JSON.stringify(hubspotBody),
        headers: {
          'Authorization': `Bearer ${hubspotAccessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        throw errors.ERROR_BAD_REQUEST({
          message: `Error submitting data to hubspot`,
        })
      }

      return {
        success: true,
      }
    }
    catch {
      throw errors.ERROR_BAD_REQUEST({
        message: `Error submitting data to hubspot`,
      })
    }
  })
