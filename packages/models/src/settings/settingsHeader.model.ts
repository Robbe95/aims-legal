import { z } from 'zod'

import { clientNavigationLinkSchema } from '#navigation-link/navigationLink.model.ts'

export const clientSettingsHeaderSchema = z.object({
  headerLinks: z.array(clientNavigationLinkSchema),
})
export type ClientSettingsHeader = z.infer<typeof clientSettingsHeaderSchema>
