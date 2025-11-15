'use client'

import type { DefaultCellComponentProps } from 'payload'

export function HeaderCellLabel(props: DefaultCellComponentProps) {
  const linksAmount = props.cellData.links.length

  return (
    <div>
      { `Links: ${linksAmount}` }
    </div>
  )
}
