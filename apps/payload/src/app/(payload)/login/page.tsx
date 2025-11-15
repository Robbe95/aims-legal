import LoginButton from '@payload/components/auth/LoginButton'
import { BigLogo } from '@payload/components/logo/Logo'
import { getEnv } from '@payload/env'


export default async function Login() {

  const {
    AUTH_BASE_URL,
    AUTH_CLIENT_ID,
    CMS_BASE_URL,
    AUTH_ORGANIZATION_ID
  } = getEnv()

  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '2rem', height: '100vh', justifyContent: 'center' }}>
      <div>
        <BigLogo />
      </div>

      <div style={{ maxWidth: '12rem', width: '100%' }}>
        <LoginButton
          AUTH_BASE_URL={AUTH_BASE_URL}
          AUTH_CLIENT_ID={AUTH_CLIENT_ID}
          CMS_BASE_URL={CMS_BASE_URL}
          AUTH_ORGANIZATION_ID={AUTH_ORGANIZATION_ID}
        />
      </div>

    </div>
  )
}
