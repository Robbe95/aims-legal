import { ARTICLES_CONTRACT } from '#contracts/article/articles.contact.ts'
import { AUTH_CONTRACT } from '#contracts/auth/auth.contract.ts'
import { HUBSPOT_CONTRACT } from '#contracts/hubspot/hubspot.contract.ts'
import { PAGES_CONTRACT } from '#contracts/pages/pages.contract.ts'
import { SETTINGS_CONTRACT } from '#contracts/settings/settings.contract.ts'

export const ORPC_CONTRACT = {
  articles: ARTICLES_CONTRACT,
  auth: AUTH_CONTRACT,
  hubspot: HUBSPOT_CONTRACT,
  pages: PAGES_CONTRACT,
  settings: SETTINGS_CONTRACT,
}
