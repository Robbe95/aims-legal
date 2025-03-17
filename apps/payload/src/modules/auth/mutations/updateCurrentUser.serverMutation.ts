import { authProcedure } from '@payload/trpc/procedures/auth.procedure'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import {
  AuthTransformer,
  currentUserSchema,
  updateCurrentUserFormSchema,
} from '@repo/models'
import type { User } from '@repo/payload-types'
import { filterOptionalValues } from '@repo/utils'

export const updateCurrentUser = authProcedure
  .output(currentUserSchema)
  .input(updateCurrentUserFormSchema)
  .mutation(async ({ ctx, input }) => {
    const payload = await getPayload()

    const filteredInput = filterOptionalValues(input)
    const dataToUpdate: Partial<User> = {
      darkMode: filteredInput.darkMode,
      firstName: filteredInput.firstName,
      lastName: filteredInput.lastName,
    }

    const user = await payload.update({
      id: ctx.user.id,
      collection: 'users',
      data: dataToUpdate,
    })

    return AuthTransformer.toCurrentUser(user)
  })
