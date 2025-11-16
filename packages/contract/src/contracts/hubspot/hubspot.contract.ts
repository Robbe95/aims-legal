import {
  clientHubspotFormSchema,
  hubspotFormSubmitSchema,
} from '@repo/models'
import { z } from 'zod'

import {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
} from '#errors/errors.ts'
import { publicProcedure } from '#procedures/procedures.ts'

export const getHubspotFormById = publicProcedure
  .input(z.object({
    formId: z.string(),
  }))
  .output(clientHubspotFormSchema)
  .errors({
    ERROR_BAD_REQUEST,
    ERROR_NOT_FOUND,
  })

export const submitHubspotForm = publicProcedure
  .input(z.object({
    formId: z.string(),
    data: hubspotFormSubmitSchema,
  }))
  .output(z.object({
    success: z.boolean(),
  }))
  .errors({
    ERROR_BAD_REQUEST,
    ERROR_NOT_FOUND,
  })

export const HUBSPOT_CONTRACT = {
  getHubspotFormById,
  submitHubspotForm,
}
