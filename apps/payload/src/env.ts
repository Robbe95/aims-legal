/* eslint-disable node/prefer-global/process */

export function getEnv() {
  return {
    AUTH_BASE_URL: process.env.AUTH_BASE_URL as string,
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID as string,
    AUTH_CREATOR_CLIENT_ID: process.env.AUTH_CREATOR_CLIENT_ID as string,
    AUTH_CREATOR_CLIENT_SECRET: process.env.AUTH_CREATOR_CLIENT_SECRET as string,
    AUTH_INTERNAL_ORGANIZATION_ID: process.env.AUTH_INTERNAL_ORGANIZATION_ID as string,
    AUTH_ISSUER: process.env.AUTH_ISSUER as string,
    AUTH_JWKS_ENDPOINT: process.env.AUTH_JWKS_ENDPOINT as string,
    AUTH_ORGANIZATION_ID: process.env.AUTH_ORGANIZATION_ID as string,
    AUTH_PROJECT_ID: process.env.AUTH_PROJECT_ID as string,

    CMS_BASE_URL: process.env.CMS_BASE_URL as string,

    ENVIRONMENT: process.env.ENVIRONMENT as string,

    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID as string,
    S3_BUCKET: process.env.S3_BUCKET as string,
    S3_ENDPOINT: process.env.S3_ENDPOINT as string,
    S3_REGION: process.env.S3_REGION as string,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY as string,

    SITE_BASE_URL: process.env.SITE_BASE_URL as string,
  } as const
}
