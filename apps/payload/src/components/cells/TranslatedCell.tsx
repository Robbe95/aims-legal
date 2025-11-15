/* eslint-disable func-style */

'use client' // Important for client-side components in Payload 3.x+
import { useConfig } from '@payloadcms/ui'
import type { DefaultCellComponentProps } from 'payload'
import { stringify } from 'qs-esm'
import React, {
  useEffect,
  useState,
} from 'react'

function isTranslated(data: any, locale: string): boolean {
  return Boolean(data.title?.[locale])
    && Boolean(data.slug?.[locale])
    && Boolean(data.subsite)
}

export const TranslatedLanguagesCell: React.FC<DefaultCellComponentProps> = ({
  rowData,
}) => {
  const {
    config,
  } = useConfig()
  const localization = config.localization
  const [
    translatedLanguages,
    setTranslatedLanguages,
  ] = useState<{
    isTranslated: boolean
    code: string
  }[]>([])

  useEffect(() => {
    if (!localization || !rowData?.id) {
      return
    }

    const fetchAllLocales = async () => {
      const select = {
        title: true,
        slug: true,
        subsite: true,
        // This query could be much more complex
        // and QS would handle it beautifully
      }

      // Replace 'your-collection-slug' with your actual collection slug
      const stringifiedQuery = stringify(
        {
          depth: 0,
          locale: 'all',
          select, // ensure that `qs-esm` adds the `where` property, too!
        },
        {
          addQueryPrefix: true,
        },
      )

      // const res = await fetch(`/api/pages/${rowData.id}${stringifiedQuery}`)
      const res = await fetch(`/api/pages/${rowData.id}${stringifiedQuery}`)

      if (!res.ok) {
        return
      }
      const data = await res.json()
      const locales = localization.locales || []

      const filledLocales = locales.map((locale) => {
        // Adjust 'title' to your translated field
        return {
          isTranslated: isTranslated(data, locale.code),
          code: locale.code,
        }
      })

      setTranslatedLanguages(filledLocales)
    }

    fetchAllLocales()
  }, [
    localization,
    rowData,
  ])

  if (!localization) {
    console.warn('Localization is not configured in Payload. Please check your Payload configuration.')

    return null
  }

  if (!rowData) {
    return null
  }

  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
    }}
    >
      {translatedLanguages.length > 0
        ? translatedLanguages.map((lang) => (
            <div
              key={lang.code}
              style={{
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  backgroundColor: lang.isTranslated ? 'oklch(95% 0.052 163.051)' : 'oklch(93.6% 0.032 17.717)',
                  borderColor: lang.isTranslated ? 'oklch(43.2% 0.095 166.913)' : 'oklch(44.4% 0.177 26.899)',
                  borderRadius: '4px',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  color: lang.isTranslated ? 'oklch(43.2% 0.095 166.913)' : 'oklch(44.4% 0.177 26.899)',
                  display: 'flex',
                  fontSize: '0.875rem',
                  gap: '0.25rem',
                  padding: '0rem 0.5rem',
                }}
                key={lang.code}
              >

                {lang.code}
                { lang.isTranslated
                  ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z" />
                      </svg>
                    )
                  : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
                      </svg>
                    )}
              </div>
            </div>
          ))
        : (
            <span style={{
              color: '#aaa',
            }}
            >
              No translations
            </span>
          )}
    </div>
  )
}
