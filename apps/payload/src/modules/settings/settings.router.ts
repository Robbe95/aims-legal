import { getSettingsFooter } from '@payload/modules/settings/queries/getSettingsFooter.serverQuery'
import { getSettingsHeader } from '@payload/modules/settings/queries/getSettingsHeader.serverQuery'
import { getSettingsHomepage } from '@payload/modules/settings/queries/getSettingsHomePage.serverQuery'
import { getSettingsSocials } from '@payload/modules/settings/queries/getSettingsSocials.serverQuery'
import type { OrpcRouter } from '@payload/orpc/router/orpc.router'

export const settingsRouter: OrpcRouter['settings'] = {
  getSettingsFooter,
  getSettingsHeader,
  getSettingsHomepage,
  getSettingsSocials,
}
