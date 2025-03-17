import { orpc } from '@payload/orpc/orpc'

export const authProcedure = orpc.use(({ context, errors, next }) => {
  if (context.user?.email == null) {
    throw errors.UNAUTHORIZED()
  }

  return next({
    context: {
      locale: context.locale,
      token: context.token,
      user: context.user,
    },
  })
})
