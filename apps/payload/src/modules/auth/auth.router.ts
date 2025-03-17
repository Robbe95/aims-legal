import { getCurrentUser } from '@payload/modules/auth/queries/getCurrentUser.serverQuery'
import { router } from '@payload/trpc/trpc'

import { updateCurrentUser } from './mutations/updateCurrentUser.serverMutation'

export const authRouter = router({
  getCurrentUser,
  updateCurrentUser,
})
