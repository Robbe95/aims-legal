'use client'

import { getDefaultScopes } from '@payload/auth/authData'
import { getCookie } from 'cookies-next'
import { setCookie } from 'cookies-next/client'
import pkceChallenge from 'pkce-challenge'
import React, {
  useEffect,
  useState,
} from 'react'

interface EnvVars {

  AUTH_BASE_URL: string
  AUTH_CLIENT_ID: string
  AUTH_ORGANIZATION_ID: string
  CMS_BASE_URL: string

}

async function getLoginUrl({
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  AUTH_ORGANIZATION_ID,
  CMS_BASE_URL,
}: EnvVars): Promise<string> {
  const searchParams = new URLSearchParams()
  let codeChallenge = await getCookie('code_challenge')
  const codeVerifier = await getCookie('code_verifier')

  if (codeChallenge == null || codeVerifier == null) {
    const codes = await pkceChallenge()

    setCookie('code_challenge', codes.code_challenge)
    setCookie('code_verifier', codes.code_verifier)

    codeChallenge = codes.code_challenge
  }

  const scopes = getDefaultScopes(AUTH_ORGANIZATION_ID)

  searchParams.append('client_id', `${AUTH_CLIENT_ID}`)
  searchParams.append('redirect_uri', `${CMS_BASE_URL}/auth/callback`)
  searchParams.append('response_type', 'code')
  searchParams.append('prompt', 'login')
  searchParams.append('scope', scopes.join(' '))
  searchParams.append('code_challenge', codeChallenge)
  searchParams.append('code_challenge_method', 'S256')

  return `${AUTH_BASE_URL}/oauth/v2/authorize?${searchParams.toString()}`
}

function LoginButton({
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  AUTH_ORGANIZATION_ID,
  CMS_BASE_URL,
}: EnvVars) {
  const [
    url,
    setUrl,
  ] = useState<string | null>(null)

  // 3. Create out useEffect function
  useEffect(() => {
    getLoginUrl({
      AUTH_BASE_URL,
      AUTH_CLIENT_ID,
      AUTH_ORGANIZATION_ID,
      CMS_BASE_URL,
    }).then((value) => {
      setUrl(value)
    })
  }, [])

  return (
    <div>
      <a
        className={`
          btn btn--style-primary btn--icon-style-without-border btn--size-medium
        `}
        style={{
          display: 'block',
          textAlign: 'center',
          width: '100%',
        }}
        href={url ?? ''}
      >
        Sign in
      </a>
    </div>

  )
}

export default LoginButton
