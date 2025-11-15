/* eslint-disable func-style */

'use client'
import './index.css'
import '@payloadcms/next/css'

import { useTenantSelection } from '@payloadcms/plugin-multi-tenant/client'
import { useNav } from '@payloadcms/ui'
import React from 'react'

export const NavWrapper: React.FC<{
  baseClass?: string
  children: React.ReactNode
}> = (props) => {
  const {
    baseClass, children,
  } = props

  const {
    hydrated,
    navOpen,
    navRef,
    shouldAnimate,
  } = useNav()

  const tenantSelection = useTenantSelection()

  if (tenantSelection.selectedTenantID == null) {
    tenantSelection.setTenant({
      id: tenantSelection.options[0]?.value,
      refresh: true,
    })
  }

  return (
    <aside
      className={[
        baseClass,
        navOpen && `${baseClass}--nav-open`,
        shouldAnimate && `${baseClass}--nav-animate`,
        hydrated && `${baseClass}--nav-hydrated`,
      ]
        .filter(Boolean)
        .join(' ')}
      inert={!navOpen ? true : undefined}
    >
      <div
        className={`
          ${baseClass}__scroll
        `}
        ref={navRef}
      >
        {children}
      </div>
    </aside>
  )
}
