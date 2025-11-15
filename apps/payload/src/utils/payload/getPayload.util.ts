import config from '@payload-config'
import { getPayload as getPayloadWithConfig } from 'payload'

export async function getPayload() {
  const payload = await getPayloadWithConfig({
    config,
  })

  return payload
}
