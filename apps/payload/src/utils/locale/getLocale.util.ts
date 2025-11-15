import type { Locale } from '@repo/constants'
import type { NextRequest } from 'next/server'

export function getLocale(request: NextRequest): Locale {
  const locale = request.nextUrl.searchParams.get('locale') as Locale

  return locale ?? 'en' as Locale
}
