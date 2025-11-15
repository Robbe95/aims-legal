import { ORPCError } from '@orpc/server'
import { ValidationError } from 'payload'

export function errorServerMiddlware(error: unknown) {
  // Handle input validation errors

  if (
    error instanceof ORPCError
    && error.code === 'BAD_REQUEST'
    && error.cause instanceof ValidationError
  ) {
    // If you only use Zod you can safely cast to ZodIssue[]
    // @ts-expect-error We only uze zod so works
    const zodError = new ZodError(error.cause.issues as ZodIssue[])

    throw new ORPCError('INPUT_VALIDATION_FAILED', {
      cause: error.cause,
      data: zodError.flatten(),
      status: 422,
    })
  }

  // Handle output validation errors
  if (
    error instanceof ORPCError
    && error.code === 'INTERNAL_SERVER_ERROR'
    && error.cause instanceof ValidationError
  ) {
    throw new ORPCError('OUTPUT_VALIDATION_FAILED', {
      cause: error.cause,
    })
  }

  // Log errors
  // i can send this to sentry someday
  console.error(error)
}
