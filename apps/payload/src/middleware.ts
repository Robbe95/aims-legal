import { withCorsMiddleware } from '@payload/middlewares/cors.middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const corsMiddleware = withCorsMiddleware({
    request,
    response,
  })

  return corsMiddleware.response
}
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ],
}
