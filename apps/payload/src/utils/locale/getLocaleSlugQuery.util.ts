import { LOCALES } from '@repo/constants'
import type { Where } from 'payload'

export function getLocaleSlugQuery(slug: string): { or: Where[] } {
  const mappedLocale = LOCALES.map((locale) => {
    return [
      {
        [`slug.${locale}`]: {
          equals: slug,
        },
      },
    ]
  }).reduce((acc, curr) => {
    return [
      ...acc,
      ...curr,
    ]
  }, [])

  return {
    or: mappedLocale,
  }
}
