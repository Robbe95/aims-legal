import { z } from 'zod'

import { useGlobalI18n } from '~base/composables/i18n/useGlobalI18n'

export default defineNuxtPlugin({
  dependsOn: [
    'i18n:plugin',
  ],
  name: 'api',
  parallel: true,
  setup() {
    z.config({
      customError: (issue) => {
        const {
          t,
        } = useGlobalI18n()

        const isStringAndEmpty = issue.code === 'too_small' && issue.minimum === 1 && issue.origin === 'string'
        const isInvalidType = issue.code === 'invalid_type'

        if (isStringAndEmpty || isInvalidType) {
          return {
            message: t('base.validation.required'),
          }
        }

        if (issue.code === 'invalid_format') {
          if (issue.format === 'email') {
            return {
              message: t('base.validation.invalid_email'),
            }
          }
        }

        if (issue.code === 'invalid_union') {
          return {
            message: t('base.validation.invalid_union'),
          }
        }

        if (issue.code === 'invalid_format') {
          if (issue.format === 'email') {
            return {
              message: t('base.validation.invalid_email'),
            }
          }
          if (issue.validation === 'url') {
            return {
              message: t('base.validation.invalid_url'),
            }
          }
          if (issue.validation === 'uuid') {
            return {
              message: t('base.validation.invalid_uuid'),
            }
          }
          if (issue.validation === 'regex') {
            return {
              message: t('base.validation.invalid_regex'),
            }
          }
          if (issue.validation === 'datetime') {
            return {
              message: t('base.validation.invalid_datetime'),
            }
          }

          return {
            message: t('base.validation.invalid_string'),
          }
        }

        if (issue.code === 'too_big') {
          if (issue.type === 'string') {
            return {
              message: t('base.validation.too_big_string', {
                count: issue.maximum,
              }),
            }
          }
          if (issue.type === 'number') {
            return {
              message: t('base.validation.too_big_number', {
                count: issue.maximum,
              }),
            }
          }
          if (issue.type === 'array') {
            return {
              message: t('base.validation.too_big_array', {
                count: issue.maximum,
              }),
            }
          }
          if (issue.type === 'date') {
            return {
              message: t('base.validation.too_big_date', {
                count: issue.maximum,
              }),
            }
          }

          return {
            message: t('base.validation.too_big', {
              count: issue.maximum,
            }),
          }
        }

        if (issue.code === 'too_small') {
          if (issue.origin === 'string') {
            return {
              message: t('base.validation.too_small_string', {
                count: issue.minimum,
              }),
            }
          }
          if (issue.origin === 'number') {
            return {
              message: t('base.validation.too_small_number', {
                count: issue.minimum,
              }),
            }
          }
          if (issue.origin === 'array') {
            return {
              message: t('base.validation.too_small_array', {
                count: issue.minimum,
              }),
            }
          }
          if (issue.origin === 'date') {
            return {
              message: t('base.validation.too_small_date', {
                v: issue.minimum,
              }),
            }
          }

          return {
            message: t('base.validation.too_small', {
              count: issue.minimum,
            }),
          }
        }

        return {
          message: t('base.validation.invalid_type'),
        }
      },
    })
  },
})
