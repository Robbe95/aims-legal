import type { ErrorMap } from '@orpc/contract'

export const ERROR_UNAUTHORIZED: NonNullable<ErrorMap['UNAUTHORIZED']> = {
  message: 'Unauthorized',
  status: 403,
}

export const ERROR_NOT_FOUND: NonNullable<ErrorMap['NOT_FOUND']> = {
  message: 'Not found',
  status: 404,
}

export const ERROR_BAD_REQUEST: NonNullable<ErrorMap['BAD_REQUEST']> = {
  message: 'Bad request',
  status: 400,
}
export const ERROR_UNKNOWN = {
  code: 'UNKNOWN_ERROR',
  message: 'Unknown error',
  status: 500,
}

export const ERRORS = {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_UNAUTHORIZED,
  ERROR_UNKNOWN,
}
