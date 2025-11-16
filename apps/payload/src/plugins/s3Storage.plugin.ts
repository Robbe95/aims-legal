import process from 'node:process'

import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export function pluginStorage() {
  return vercelBlobStorage({
    // Specify which collections should use Vercel Blob
    collections: {
      images: true,
    },
    enabled: true, // Optional, defaults to true
    // Token provided by Vercel once Blob storage is added to your Vercel project
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
}
