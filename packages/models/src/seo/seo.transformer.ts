import type { Page } from '@repo/payload-types'

import { ImageTransformer } from '#image/image.transformer.ts'
import type { ClientSeo } from '#seo/seo.model.ts'

export const SeoTransformer = {
  toClientSeo(seo: Page['seo']): ClientSeo {
    if (typeof seo?.image === 'string') {
      throw new TypeError('Image value is not an object, depth should be increased')
    }

    const clientSeo: ClientSeo = {
      title: seo?.title ?? null,
      description: seo?.description ?? null,
      image: seo?.image ? ImageTransformer.toClientImage(seo.image) : null,
    }

    return clientSeo
  },

}
