import { getEnv } from '@payload/env'
import type { User } from '@repo/payload-types'
import type { CollectionAfterChangeHook } from 'payload'

export async function createZitadelUserHook({
  data, operation,
}: Parameters<CollectionAfterChangeHook<User>>[0]): Promise<ReturnType<CollectionAfterChangeHook<User>>> {
  if (operation !== 'create') {
    return
  }
  const {
    AUTH_BASE_URL,
    AUTH_CREATOR_CLIENT_ID,
    AUTH_CREATOR_CLIENT_SECRET,
    AUTH_ORGANIZATION_ID,
  } = getEnv()

  if (!AUTH_CREATOR_CLIENT_ID || !AUTH_CREATOR_CLIENT_SECRET) {
    return
  }

  const base64Credentials = btoa(`${AUTH_CREATOR_CLIENT_ID}:${AUTH_CREATOR_CLIENT_SECRET}`)

  const responseAuth = await fetch(`${AUTH_BASE_URL}/oauth/v2/token`, {
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: `openid profile urn:zitadel:iam:org:project:id:${AUTH_ORGANIZATION_ID}:aud urn:zitadel:iam:org:project:id:zitadel:aud`,
    }),
    headers: {
      'Authorization': `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })

  const authResponse = await responseAuth.json()

  const body = JSON.stringify({
    email: {
      email: data.email,
    },
    organization: {
      orgId: AUTH_ORGANIZATION_ID,
    },
    profile: {
      displayName: `${data.firstName}  ${data.firstName}`,
      familyName: data.lastName,
      givenName: data.firstName,
    },
  })

  await fetch(`${AUTH_BASE_URL}/v2/users/human`, {
    body,
    headers: {
      'Authorization': `Bearer ${authResponse.access_token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}
