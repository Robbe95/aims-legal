import {
  implement,
  onError,
} from '@orpc/server'
import type { ContextHeaders } from '@payload/orpc/context/context'
import { contextServerMiddleware } from '@payload/orpc/middleware/context.serverMiddleware'
import { errorServerMiddlware } from '@payload/orpc/middleware/error.serverMiddleware'
import { ORPC_CONTRACT } from '@repo/contract'
import type { TypedLocale } from 'payload'

export const ORPC_BASE_LOCALE: TypedLocale = 'en'
const osWithContract = implement(ORPC_CONTRACT)
const orpcWithContextHeaders = osWithContract.$context<ContextHeaders>()

export const orpc = orpcWithContextHeaders
  .use(contextServerMiddleware)
  .use(onError((error) => errorServerMiddlware(error)))

export type MiddlewareContextParameter = Parameters<Parameters<typeof orpcWithContextHeaders['use']>[0]>[0]
