/* eslint-disable check-file/folder-naming-convention */

import { RPCHandler, serve } from '@orpc/server/next'
import { orpcRouter } from '@payload/orpc/router/orpc.router'

const handler = new RPCHandler(orpcRouter)

export const {
  DELETE,
  GET,
  PATCH,
  POST,
  PUT,
} = serve(
  handler,
  {
    context: (req) => {
      return {
        'Accept-Language': req.headers.get('Accept-Language'),
        'Authorization': req.headers.get('Authorization'),
      }
    },
    prefix: '/api/rpc',
  },
)
