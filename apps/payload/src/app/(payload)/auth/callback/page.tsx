import CallbackView from '@payload/components/auth/CallbackView'
import { getEnv } from '@payload/env'
export default function Callback() {
  const {
    AUTH_BASE_URL,
    AUTH_CLIENT_ID,
    CMS_BASE_URL,
  } = getEnv()

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
      <CallbackView
        AUTH_BASE_URL={AUTH_BASE_URL}
        AUTH_CLIENT_ID={AUTH_CLIENT_ID}
        CMS_BASE_URL={CMS_BASE_URL}
      />
    </div>
  )
}
