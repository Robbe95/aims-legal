import { z } from 'zod'

import { clientNavigationLinkSchema } from '#navigation-link/navigationLink.model.ts'

export const clientSettingsFooterSchema = z.array(clientNavigationLinkSchema)
export type ClientSettingsFooter = z.infer<typeof clientSettingsFooterSchema>
