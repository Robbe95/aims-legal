import en from '~root/i18n/locales/en.json'
import nl from '~root/i18n/locales/nl.json'

export default defineI18nConfig(() => ({
  bundle: {
    optimizeTranslationDirective: false,
  },
  defaultLocale: 'en',
  flatJson: true,
  keystyle: 'nested',
  legacy: false,
  locales: [
    'en',
    'nl',
  ],
  messages: {
    en,
    nl,
  },
  warnHtmlInMessage: 'off',
}))
