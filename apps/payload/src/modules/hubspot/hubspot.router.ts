import { submitHubspotForm } from '@payload/modules/hubspot/mutations/submitHubspotForm.serverMutation'
import { getHubspotFormById } from '@payload/modules/hubspot/queries/getHubspotFormById.serverQuery'
import type { OrpcRouter } from '@payload/orpc/router/orpc.router'

export const hubspotRouter: OrpcRouter['hubspot'] = {
  getHubspotFormById,
  submitHubspotForm,
}
