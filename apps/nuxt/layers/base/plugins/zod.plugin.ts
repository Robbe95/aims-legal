import z, { } from 'zod'

import { useGlobalI18n } from '~~/layers/base/composables/i18n/useGlobalI18n'

export function configureZod(): void {
  z.config({
    customError: (iss) => {
      const {
        t,
      } = useGlobalI18n()

      const isStringAndEmpty = iss.code === 'too_small' && iss.origin === 'string'
      const isInvalidType = iss.code === 'invalid_type'
      const isInvalidDiscriminator = iss.code === 'invalid_union'

      if (isStringAndEmpty || isInvalidType || isInvalidDiscriminator) {
        return t('validation.required')
      }

      if (iss.code === 'invalid_format' && iss.format === 'email') {
        return t('validation.invalid_email')
      }
      if (iss.code === 'invalid_format' && iss.format === 'url') {
        return t('validation.invalid_url')
      }
      if (iss.code === 'invalid_format' && iss.format === 'date') {
        return t('validation.invalid_date')
      }
      if (iss.code === 'invalid_format' && iss.format === 'time') {
        return t('validation.invalid_time')
      }
      if (iss.code === 'invalid_format' && iss.format === 'datetime') {
        return t('validation.invalid_datetime')
      }

      if (iss.code === 'too_big' && iss.origin === 'string') {
        return t('validation.too_big_string', {
          count: iss.maximum,
        })
      }
      if (iss.code === 'too_big' && iss.origin === 'number') {
        return t('validation.too_big_number', {
          count: iss.maximum,
        })
      }
      if (iss.code === 'too_big' && iss.origin === 'array') {
        return t('validation.too_big_array', {
          count: iss.maximum,
        })
      }
      if (iss.code === 'too_big' && iss.origin === 'date') {
        return t('validation.too_big_date', {
          count: iss.maximum,
        })
      }

      if (iss.code === 'too_small' && iss.origin === 'string') {
        return t('validation.too_small_string', {
          count: iss.minimum,
        })
      }
      if (iss.code === 'too_small' && iss.origin === 'number') {
        return t('validation.too_small_number', {
          count: iss.minimum,
        })
      }
      if (iss.code === 'too_small' && iss.origin === 'array') {
        return t('validation.too_small_array', {
          count: iss.minimum,
        })
      }
      if (iss.code === 'too_small' && iss.origin === 'date') {
        return t('validation.too_small_date', {
          v: iss.minimum,
        })
      }
    },
  })
}

export default defineNuxtPlugin({
  dependsOn: [
    'i18n:plugin',
  ],
  name: 'api',
  parallel: true,
  setup() {
    configureZod()
  },
})
