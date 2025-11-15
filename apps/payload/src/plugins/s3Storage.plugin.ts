import process from 'node:process'

import { getEnv } from '@payload/env'
import { s3Storage } from '@payloadcms/storage-s3'

export function pluginStorage() {
  const env = getEnv()

  return s3Storage({
    bucket: env.S3_BUCKET as string,
    collections: {
      assets: true,
      files: true,
      icons: true,
      images: true,
    },
    config: {
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      },
      endpoint: env.S3_ENDPOINT as string,
      // TODO: What on the server?
      forcePathStyle: true,
      region: env.S3_REGION as string,
      requestHandler: {
        httpAgent: {
          keepAlive: true,
          maxSockets: 300,
        },
        httpsAgent: {
          keepAlive: true,
          maxSockets: 300,
        },
      },

    },
    enabled: env.ENVIRONMENT !== 'local',
    signedDownloads: true,
  })
}
