'use client'
import { loginWithCode } from '@payload/auth/loginWithCode'
import { LoadingOverlay } from '@payloadcms/ui'
import { getCookie } from 'cookies-next'
import {
  redirect,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useEffect } from 'react'

interface CallbackViewProps {
  AUTH_BASE_URL: string
  AUTH_CLIENT_ID: string
  CMS_BASE_URL: string
}
export default function CallbackView({
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  CMS_BASE_URL,
}: CallbackViewProps) {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const router = useRouter()

  if (code == null) {
    redirect('/login')
  }

  const codeVerifier = getCookie('code_verifier') as string

  useEffect(() => {
    loginWithCode({
      AUTH_BASE_URL,
      AUTH_CLIENT_ID,
      CMS_BASE_URL,
      code,
      codeVerifier,
    })
      .then(({
        success,
      }) => {
        if (success) {
          router.push('/')
          window.location.replace('/')
        }
      })
  }, [
    codeVerifier,
  ])

  return (
    <div style={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      height: '100vh',
      justifyContent: 'center',
    }}
    >
      <LoadingOverlay />
    </div>
  )
}
