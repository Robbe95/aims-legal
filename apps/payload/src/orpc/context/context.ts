import type { User } from '@repo/payload-types'
import type { TypedLocale } from 'payload'

export interface ContextHeaders {
  'Accept-Language': string | null
  'Authorization': string | null
  'X-Site-Name': string | null
}

export interface Context {
  locale: TypedLocale
  token: string | null
  user: User | null
}

export function createContext({
  locale, token,
}:
{
  locale: TypedLocale
  token: string | null
}): Context {
  if (token == null) {
    return {
      locale,
      token,
      user: null,
    }
  }

  return {
    locale,
    token,
    user: null,
  }
}
