import { z } from 'zod'

export const clientImageSizeSchema = z.object({
  filename: z.string(),
  filesize: z.number(),
  height: z.number(),
  mimeType: z.string(),
  url: z.string(),
  width: z.number(),
})
export const clientImageSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  alt: z.string(),
  filename: z.string(),
  filesize: z.number(),
  focalX: z.number(),
  focalY: z.number(),
  height: z.number(),
  mimeType: z.string(),
  sizes: z.object({
    background: clientImageSizeSchema,
    card: clientImageSizeSchema,
    desktop: clientImageSizeSchema,
    tablet: clientImageSizeSchema,
    thumbnail: clientImageSizeSchema,
  }),
  thumbnailURL: z.string(),
  url: z.string(),
  width: z.number(),
})

export type ClientImage = z.infer<typeof clientImageSchema>
export type ClientImageSize = z.infer<typeof clientImageSizeSchema>
