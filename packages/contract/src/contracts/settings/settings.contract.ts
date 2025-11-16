import {
  clientSettingsFooterSchema,
  clientSettingsHeaderSchema,
  clientSettingsHomePageSchema,
  clientSettingsSocialsSchema,
} from '@repo/models'

import { publicProcedure } from '#procedures/procedures.ts'

const getSettingsSocials = publicProcedure
  .output(clientSettingsSocialsSchema)

const getSettingsHeader = publicProcedure
  .output(clientSettingsHeaderSchema)

const getSettingsFooter = publicProcedure
  .output(clientSettingsFooterSchema)

const getSettingsHomepage = publicProcedure
  .output(clientSettingsHomePageSchema.nullable())

export const SETTINGS_CONTRACT = {
  getSettingsFooter,
  getSettingsHeader,
  getSettingsHomepage,
  getSettingsSocials,
}
