import { z } from 'zod'

export const LOCALES = [
  'en',
  'nl',
] as const

export const DEFAULT_LOCALE = 'en'
export const FALLBACK_LOCALE = 'en'

export const localeSchema = z.enum(LOCALES)

export type Locale = typeof LOCALES[number]

export function toContentServeLocale(locale: Locale): string {
  switch (locale) {
    case 'nl':
      return 'nl_NL'
    case 'en':
      return 'en_GB'
  }
}
