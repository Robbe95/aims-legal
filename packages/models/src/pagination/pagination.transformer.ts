import { assert } from '@repo/utils'

import type {
  PaginationOutput,
  PaginationPayload,
} from '#pagination/pagination.model.ts'

export const PaginationTransformer = {
  toPaginationOutput: <T>(
    {
      data, pagination,
    }:
    {
      data: T[]
      pagination: PaginationPayload
    },
  ): PaginationOutput<T> => {
    const skip = pagination.page ? (pagination.page - 1) * pagination.limit : 0
    const take = pagination.limit

    assert(pagination.page != null, 'Page cannot be NULL or undefined in a paginated call')

    return {
      hasNextPage: pagination.hasNextPage,
      hasPrevPage: pagination.hasPrevPage,
      docs: data,
      page: pagination.page,
      skip,
      take,
      totalDocs: pagination.totalDocs,
      totalPages: pagination.totalPages,
    }
  },
}
