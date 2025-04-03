import type {
  SendMailOptions,
  SentMessageInfo,
  Transport,
} from 'nodemailer'
import type MailMessage from 'nodemailer/lib/mailer/mail-message'
import type { FetchError } from 'ofetch'
import { ofetch } from 'ofetch'

export interface ScalewayTransportOptions {
  projectId?: string
  apiEndpoint?: string
  apiKey: string
  region: string
}

interface ScalewayAddress {
  name?: string
  email: string
}

interface ScalewayApiPayload {
  project_id?: string
  bcc?: ScalewayAddress[]
  cc?: ScalewayAddress[]
  from: ScalewayAddress
  html?: string
  subject: string
  text?: string
  to: ScalewayAddress[]
}

interface ScalewaySuccessResponse {
  emails?: Array<{
    message_id: string
  }>
}

function formatAddresses(addresses: SendMailOptions['to']): ScalewayAddress[] {
  if (!addresses) {
    return []
  }

  const addressArray = Array.isArray(addresses)
    ? addresses
    : [
        addresses,
      ]

  return addressArray.map((address) => {
    if (typeof address === 'string') {
      return { email: address }
    }
    else if (address && typeof address === 'object' && address.address) {
      return { name: address.name || undefined, email: address.address }
    }

    console.warn('Unsupported address format encountered:', address)

    return {
      email: '',
    }
  }).filter((addr) => addr.email)
}

export default function scalewayTransporter(options: ScalewayTransportOptions): Transport {
  if (!options.apiKey) {
    throw new Error('Scaleway API key (apiKey) is required.')
  }
  if (!options.region) {
    throw new Error('Scaleway region is required.')
  }

  const defaultApiEndpoint = `https://api.scaleway.com/transactional-email/v1alpha1/regions/${options.region}/emails`
  const apiEndpoint = options.apiEndpoint || defaultApiEndpoint

  return {
    name: 'ScalewayTEM',
    send: async (mail: MailMessage, callback: (err: Error | null, info?: SentMessageInfo) => void): Promise<void> => {
      const mailData = mail.data

      let fromAddress: ScalewayAddress

      if (typeof mailData.from === 'string') {
        fromAddress = {
          email: mailData.from,
        }
      }
      else if (mailData.from && typeof mailData.from === 'object' && mailData.from.address) {
        fromAddress = {
          name: mailData.from.name || undefined,
          email: mailData.from.address,
        }
      }
      else {
        return callback(new Error('Invalid or missing "from" address in email options.'))
      }

      const payload: ScalewayApiPayload = {
        project_id: options.projectId,
        bcc: formatAddresses(mailData.bcc),
        cc: formatAddresses(mailData.cc),
        from: fromAddress,
        html: mailData.html ? String(mailData.html) : undefined,
        subject: mailData.subject || '(no subject)',
        to: formatAddresses(mailData.to),
      }

      if (payload.cc?.length === 0) {
        delete payload.cc
      }
      if (payload.bcc?.length === 0) {
        delete payload.bcc
      }
      if (!payload.text) {
        delete payload.text
      }
      if (!payload.html) {
        delete payload.html
      }
      if (!payload.project_id) {
        delete payload.project_id
      }
      if (!payload.text) {
        delete payload.text
      }

      if (payload.to.length === 0) {
        return callback(new Error('No valid "to" addresses provided.'))
      }
      if (!payload.text && !payload.html) {
        return callback(new Error('Email must have either text_content or html_content.'))
      }

      try {
        const response = await ofetch<ScalewaySuccessResponse>(apiEndpoint, {
          body: payload,
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'nodemailer-scaleway-transport-ofetch/1.1.0',
            'X-Auth-Token': options.apiKey,
          },
          method: 'POST',
        })

        const messageId = response?.emails?.[0]?.message_id || 'N/A'

        const info: SentMessageInfo = {
          messageId,
          accepted: payload.to.map((a) => a.email),
          envelope: { from: fromAddress.email, to: payload.to.map((a) => a.email) },
          rejected: [],
          response: JSON.stringify(response),
        }

        callback(null, info)
      }
      catch (error: unknown) {
        console.error('Error sending email via Scaleway:', error)

        let errorMessage = 'Failed to send email via Scaleway TEM.'

        if (error instanceof Error) {
          errorMessage = error.message
        }

        const fetchError = error as FetchError

        if (fetchError.response) {
          errorMessage = `Scaleway API Error: ${fetchError.response.status} ${fetchError.response.statusText}.`

          if (fetchError.data) {
            try {
              errorMessage += ` Response: ${JSON.stringify(fetchError.data)}`
            }
            catch {
              errorMessage += ` Response body (non-JSON): ${fetchError.data}`
            }
          }
        }
        else if (fetchError.message) {
          errorMessage = fetchError.message
        }

        callback(new Error(errorMessage))
      }
    },

    version: '1.0.0',
  }
}
