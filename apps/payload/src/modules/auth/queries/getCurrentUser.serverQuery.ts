import { authProcedure } from '@payload/trpc/procedures/auth.procedure'
import {
  AuthTransformer,
  currentUserSchema,
} from '@repo/models'

export const getCurrentUser = authProcedure
  .output(currentUserSchema)
  .query(({ ctx }) => {
    return AuthTransformer.toCurrentUser(ctx.user)
  })
