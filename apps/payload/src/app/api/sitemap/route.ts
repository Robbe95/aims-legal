import { getTenantNameFromHeader } from '@payload/orpc/middleware/context.serverMiddleware'
import { getLocale } from '@payload/utils/locale/getLocale.util'
import { getPayload } from '@payload/utils/payload/getPayload.util'
import { sql } from '@payloadcms/db-postgres'
import { DEFAULT_LOCALE } from '@repo/constants'
import { convertLocale } from '@repo/utils'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 1000

function getSiteName(request: any): 'kreon' | 'vektron' {
  const siteName = request.nextUrl.searchParams.get('site') as 'kreon' | 'vektron'

  return siteName ?? 'kreon' as 'kreon' | 'vektron'
}

async function getTenant(tenantName: string): Promise<{ id: string }> {
  const payload = await getPayload()
  const kreonTenant = await payload.find({
    collection: 'tenants',
    depth: 0,
    fallbackLocale: DEFAULT_LOCALE,
    locale: DEFAULT_LOCALE,
    overrideAccess: true,
    select: {
      id: true,
    },
    where: {
      title: {
        equals: tenantName,
      },
    },
  })

  const firstTenant = kreonTenant.docs[0]

  if (!firstTenant) {
    throw new Error('Tenant not found')
  }

  return firstTenant
}

async function getSitemap(request: NextRequest) {
  const payload = await getPayload()
  const db = payload.db.drizzle

  const locale = getLocale(request)
  const siteName = getTenantNameFromHeader(getSiteName(request))
  const tenant = await getTenant(siteName)
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

    case 'productGroups': {
      const cursorCondition = cursorValue ? `AND pg.id > '${cursorValue}'` : ''

      const result = await db.execute<{
        id: string
        slug: string
        subsite_slug: string
      }>(sql`
        SELECT 
          pg.id,
          pg.slug,
          sl.slug as subsite_slug
        FROM payload.product_groups pg
        INNER JOIN payload.subsites s ON pg.subsite_id = s.id
        INNER JOIN payload.subsites_locales sl ON s.id = sl._parent_id AND sl._locale = ${locale}
        WHERE pg.tenant_id = ${tenant.id}
          AND pg.deleted_at IS NULL
          ${sql.raw(cursorCondition)}
        ORDER BY pg.id
        LIMIT ${PAGE_SIZE + 1}
      `)

      const productGroups = result.rows || []

      hasMore = productGroups.length > PAGE_SIZE

      const productGroupResults = hasMore ? productGroups.slice(0, PAGE_SIZE) : productGroups

      if (hasMore && productGroupResults.length > 0) {
        nextCursor = productGroupResults.at(-1)!.id
      }

      for (const productGroup of productGroupResults) {
        if (!productGroup.slug || !productGroup.subsite_slug) {
          continue
        }

        data.push({
          _sitemap: convertLocale(locale),
          loc: `/${locale}/${productGroup.subsite_slug}/product-groups/${productGroup.slug}`,
        })
      }

      break
    }

    case 'productVariants': {
      const cursorCondition = cursorValue ? `AND pv.id > '${cursorValue}'` : ''

      const result = await db.execute<{
        id: string
        product_group_slug: string
        slug: string
        subsite_slug: string
      }>(sql`
        SELECT 
          pv.id,
          pv.slug,
          sl.slug as subsite_slug,
          pg.slug as product_group_slug
        FROM payload.product_variants pv
        INNER JOIN payload.subsites s ON pv.subsite_id = s.id
        INNER JOIN payload.subsites_locales sl ON s.id = sl._parent_id AND sl._locale = ${locale}
        INNER JOIN payload.product_groups pg ON pv.product_group_id = pg.id
        WHERE pv.tenant_id = ${tenant.id}
          AND pv.deleted_at IS NULL
          ${sql.raw(cursorCondition)}
        ORDER BY pv.id
        LIMIT ${PAGE_SIZE + 1}
      `)

      const productVariants = result.rows || []

      hasMore = productVariants.length > PAGE_SIZE

      const productVariantResults = hasMore ? productVariants.slice(0, PAGE_SIZE) : productVariants

      if (hasMore && productVariantResults.length > 0) {
        nextCursor = productVariantResults.at(-1)!.id
      }

      for (const productVariant of productVariantResults) {
        if (!productVariant.slug || !productVariant.subsite_slug || !productVariant.product_group_slug) {
          continue
        }

        data.push({
          _sitemap: convertLocale(locale),
          loc: `/${locale}/${productVariant.subsite_slug}/product-groups/${productVariant.product_group_slug}/product-variants/${productVariant.slug}`,
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
