import type {
  Asset,
  Image,
} from '@repo/payload-types'
import { zodSafeParse } from '@repo/utils'

import type {
  ClientImage,
  ClientImageSize,
} from '#image/image.model.ts'
import { clientImageSchema } from '#image/image.model.ts'

type PayloadImageSize = NonNullable<NonNullable<Image['sizes']>['background']>

export function isImageString<T extends Asset | Image>(image: (string | T)): image is T {
  return typeof image !== 'string'
}

export const ImageTransformer = {
  toClientImage(image: Asset | Image): ClientImage {
    const clientImage: ClientImage = {
      id: image.id,
      createdAt: image.createdAt ?? '',
      updatedAt: image.updatedAt ?? '',
      alt: image.alt ?? '',
      filename: image.filename ?? '',
      filesize: image.filesize ?? 0,
      focalX: image.focalX ?? 50,
      focalY: image.focalY ?? 50,
      height: image.height ?? 0,
      mimeType: image.mimeType ?? '',
      sizes: {
        background: ImageTransformer.toClientImageSize(image.sizes?.background ?? {}),
        card: ImageTransformer.toClientImageSize(image.sizes?.card ?? {}),
        desktop: ImageTransformer.toClientImageSize(image.sizes?.desktop ?? {}),
        tablet: ImageTransformer.toClientImageSize(image.sizes?.tablet ?? {}),
        thumbnail: ImageTransformer.toClientImageSize(image.sizes?.thumbnail ?? {}),
      },
      thumbnailURL: image.thumbnailURL ?? '',
      url: image.url ?? '',
      width: image.width ?? 0,
    }

    return zodSafeParse({
      data: clientImage,
      schema: clientImageSchema,
    })
  },

  toClientImageSize: (imageSize: PayloadImageSize): ClientImageSize => {
    return {
      filename: imageSize.filename ?? '',
      filesize: imageSize.filesize ?? 0,
      height: imageSize.height ?? 0,
      mimeType: imageSize.mimeType ?? '',
      url: imageSize.url ?? '',
      width: imageSize.width ?? 0,
    }
  },
}
