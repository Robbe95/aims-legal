import { getLocale } from '@payload/utils/locale/getLocale.util'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { sql } from '@payloadcms/db-postgres'
import { DEFAULT_LOCALE } from '@repo/constants'
import { convertLocale } from '@repo/utils'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 1000

async function getTenant(tenantName: string): Promise<{ id: string }> {
  const payload = await getPayload()
  const defaultTenant = await payload.find({
    collection: 'tenants',
    depth: 0,
    fallbackLocale: DEFAULT_LOCALE,
    locale: DEFAULT_LOCALE,
    overrideAccess: true,
    select: {
      title: true,
    },
    where: {
      title: {
        equals: tenantName,
      },
    },
  })

  const firstTenant = defaultTenant.docs[0]

  if (!firstTenant) {
    throw new Error('Tenant not found')
  }

  return firstTenant
}

async function getSitemap(request: NextRequest) {
  const payload = await getPayload()
  const db = payload.db.drizzle

  const locale = getLocale(request)
  const tenant = await getTenant('Default')
  const collection = request.nextUrl.searchParams.get('collection') as 'pages' | 'productGroups' | 'productVariants' | null
  const cursor = request.nextUrl.searchParams.get('cursor')
  const cursorValue = cursor || null

  if (!collection) {
    return NextResponse.json({
      error: 'Collection parameter is required',
    }, {
      status: 400,
    })
  }

  console.error(`Generating sitemap for collection: ${collection}, locale: ${locale}, cursor: ${cursorValue}`)

  const data: any[] = []
  let hasMore = false
  let nextCursor: string | null = null

  switch (collection) {
    case 'pages': {
    // Query pages with cursor-based pagination using raw SQL
      console.error('About to execute pages query with cursor:', cursorValue)

      const cursorCondition = cursorValue ? `AND p.id > '${cursorValue}'` : ''

      const result = await db.execute<{
        id: string
        slug: string
        subsite_slug: string
      }>(sql`
        SELECT 
          p.id,
          pl.slug,
          sl.slug as subsite_slug
        FROM payload.pages p
        INNER JOIN payload.pages_locales pl ON p.id = pl._parent_id AND pl._locale = ${locale}
        INNER JOIN payload.subsites s ON p.subsite_id = s.id
        INNER JOIN payload.subsites_locales sl ON s.id = sl._parent_id AND sl._locale = ${locale}
        WHERE p.tenant_id = ${tenant.id}
          AND p.deleted_at IS NULL
          ${sql.raw(cursorCondition)}
        ORDER BY p.id
        LIMIT ${PAGE_SIZE + 1}
      `)

      console.error('Pages query executed successfully, got:', result.rows?.length || 0, 'results')

      const pages = result.rows || []

      hasMore = pages.length > PAGE_SIZE

      const pageResults = hasMore ? pages.slice(0, PAGE_SIZE) : pages

      if (hasMore && pageResults.length > 0) {
        nextCursor = pageResults.at(-1)!.id
      }

      for (const page of pageResults) {
        if (!page.slug || !page.subsite_slug) {
          continue
        }

        data.push({
          _sitemap: convertLocale(locale),
          loc: `/${locale}/${page.subsite_slug}/${page.slug}`,
        })
      }

      break
    }
  }

  return NextResponse.json({
    data,
    meta: {
      hasMore,
      cursor: nextCursor,
    },
  })
}

export { getSitemap as GET }
