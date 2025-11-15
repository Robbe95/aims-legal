export const COLLECTIONS_WITH_SLUG = [
  'pages',
  'articles',
] as const

export type CollectionWithSlug = typeof COLLECTIONS_WITH_SLUG[number]
