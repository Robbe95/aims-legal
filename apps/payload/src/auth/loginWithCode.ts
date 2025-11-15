import { setAuthCookie } from '@payload/auth/authData'

interface LoginWithCodeParams {
  AUTH_BASE_URL: string
  AUTH_CLIENT_ID: string
  CMS_BASE_URL: string
  code: string
  codeVerifier: string
}
export async function loginWithCode({
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  CMS_BASE_URL,
  code,
  codeVerifier,
}: LoginWithCodeParams): Promise<{ success: boolean }> {
  if (codeVerifier == null) {
    throw new Error('Code verifier not found')
  }

  const response = await fetch(`${AUTH_BASE_URL}/oauth/v2/token`, {
    body: new URLSearchParams({
      client_id: AUTH_CLIENT_ID,
      code,
      code_verifier: codeVerifier,
      grant_type: 'authorization_code',
      redirect_uri: `${CMS_BASE_URL}/auth/callback`,
      scope: 'openid profile email',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })

  const body = await response.json()

  setAuthCookie(body)

  return {
    success: true,
  }
}
