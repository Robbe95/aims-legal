/* eslint-disable max-depth */
/* eslint-disable func-style */
/* eslint-disable style/max-statements-per-line */
'use client'

import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

const CLIPBOARD_KEY = '_payloadClipboard'

function clearAllIDs<T = any>(input: T): T {
  const visit = (node: any): any => {
    if (Array.isArray(node)) { return node.map(visit) }

    if (node && typeof node === 'object') {
      if (
        typeof node.lastRenderedPath === 'string'
        && node.lastRenderedPath.endsWith('.id')
      ) {
        const copy: any = {
          ...node,
        }

        if ('value' in copy) { copy.value = '' }
        if ('initialValue' in copy) { copy.initialValue = '' }

        const out: any = {}

        for (const [
          k,
          v,
        ] of Object.entries(copy)) { out[k] = visit(v) }

        return out
      }

      const out: any = {}

      for (const [
        k,
        v,
      ] of Object.entries(node)) {
        const keyLower = k.toLowerCase()
        const isIdKey = keyLower === 'id' || k.endsWith('.id')

        if (isIdKey) {
          if (v && typeof v === 'object' && !Array.isArray(v)) {
            const inner: any = {
              ...v,
            }

            if ('value' in inner) { inner.value = '' }
            if ('initialValue' in inner) { inner.initialValue = '' }

            out[k] = visit(inner)
          }
          else {
            out[k] = ''
          }
        }
        else {
          out[k] = visit(v)
        }
      }

      return out
    }

    return node
  }

  return visit(input)
}

function sanitizeClipboardValue(raw: string): string {
  try {
    const parsed = JSON.parse(raw)
    const cleaned = clearAllIDs(parsed)
    const out = JSON.stringify(cleaned)

    return out
  }
  catch {
    return raw
  }
}

export function ClipboardSanitizerProvider({
  children,
}: PropsWithChildren) {
  useEffect(() => {
    if (typeof window === 'undefined') { return }

    const ls = window.localStorage
    const originalSetItem = ls.setItem.bind(ls)
    const originalRemoveItem = ls.removeItem.bind(ls)

    ls.setItem = (key: string, value: string) => {
      if (key === CLIPBOARD_KEY) {
        const str = typeof value === 'string' ? value : String(value)

        value = sanitizeClipboardValue(str)
      }

      return originalSetItem(key, value)
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === CLIPBOARD_KEY && typeof e.newValue === 'string') {
        const sanitized = sanitizeClipboardValue(e.newValue)

        if (sanitized !== e.newValue) {
          originalSetItem(CLIPBOARD_KEY, sanitized)
        }
      }
    }

    window.addEventListener('storage', onStorage)

    try {
      const cur = ls.getItem(CLIPBOARD_KEY)

      if (cur) {
        const sanitized = sanitizeClipboardValue(cur)

        if (sanitized !== cur) { originalSetItem(CLIPBOARD_KEY, sanitized) }
      }
    }
    catch {}

    return () => {
      ls.setItem = originalSetItem
      ls.removeItem = originalRemoveItem
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return <>{children}</>
}
