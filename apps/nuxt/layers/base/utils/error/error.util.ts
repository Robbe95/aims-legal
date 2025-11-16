import type {
  ApiError,
  ApiErrorCode,
  ApiExpectedError,
} from '@wisemen/vue-core-api-utils'
import z from 'zod'

import { LoggerUtil } from '~~/layers/base/utils/logger/logger.util'

export class ErrorUtil {
  static getApiErrorCode(error: ApiExpectedError): string | null {
    return error.errors?.[0]?.code ?? null
  }

  static getApiErrorMessage(error: ApiExpectedError): string | null {
    return error.errors?.[0]?.detail ?? null
  }

  static getCode(error: ApiExpectedError): string | ApiErrorCode | null {
    return error.errors?.[0]?.code ?? null
  }

  static getMessage(error: ApiExpectedError): string | null {
    return error.errors?.[0]?.detail ?? null
  }

  static handleApiError({
    error, message,
  }: {
    error: unknown
    message?: string
  }): ApiError {
    if (ErrorUtil.isExpectedApiError(error)) {
      return error
    }

    LoggerUtil.error(`'Unexpected API error:' ${error}`)

    if (error instanceof Error) {
      return error
    }

    return new Error(message ?? 'An unknown error occurred')
  }

  static isExpectedApiError(error: unknown): error is ApiExpectedError {
    return (error as ApiExpectedError)?.errors !== undefined
  }

  static isZodError(error: unknown): error is z.ZodError {
    return error instanceof z.ZodError
  }
}
