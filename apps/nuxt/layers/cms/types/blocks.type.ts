import type {
  Article,
  ColumnBlocks,
  Page,
} from '@repo/payload-types'

export type SingleColumnBlock = NonNullable<NonNullable<ColumnBlocks>[number]['block']>[number]

export type ClientBlocks = NonNullable<Article['blocks']> | NonNullable<Page['blocks']>
