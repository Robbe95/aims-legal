/* eslint-disable unicorn/no-keyword-prefix */
'use client'

import {
  Button,
  Modal,
  useModal,
  useTranslation,
} from '@payloadcms/ui'
import {
  drawerZBase,
  useDrawerDepth,
} from '@payloadcms/ui/elements/Drawer'
import React, {
  useCallback,
  useEffect,
} from 'react'

const baseClass = 'confirmation-modal'

export type OnCancel = () => void

export interface BynderModelProps {
  className?: string
  handleBynderLoad: () => void
  modalSlug: string
}

export function BynderModal(props: BynderModelProps) {
  const {
    className,
    handleBynderLoad,
    modalSlug,
  } = props
  const {
    t,
  } = useTranslation()

  const editDepth = useDrawerDepth()

  const {
    isModalOpen, closeModal,
  } = useModal()

  // run openBynderModal when the modal is opened
  useEffect(() => {
    setTimeout(() => {
      if (isModalOpen('bynder-compact-view')) {
        handleBynderLoad()
      }
    }, 100)
  }, [
    isModalOpen,
  ])

  const onCancel = useCallback(() => {
    closeModal(modalSlug)
  }, [
    closeModal,
    modalSlug,
  ])

  return (
    <Modal
      className={[
        baseClass,
        className,
      ].filter(Boolean).join(' ')}
      slug={modalSlug}
      id={modalSlug}
      style={{
        zIndex: drawerZBase + editDepth,
      }}
    >
      <div style={{
        background: 'white',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
        maxHeight: '80%',
        maxWidth: '80%',
        width: '100%',

      }}
      >

        <div
          style={{
            alignItems: 'center',
            borderRadius: '4px',
            display: 'flex',
            height: '100%',
            justifyContent: 'end',
            width: '100%',
            zIndex: drawerZBase + editDepth + 1,
          }}
        >

          <Button
            id="confirm-cancel"
            size="large"
            margin={false}
            type="button"

            onClick={onCancel}
          >
            { t('general:close')}
          </Button>
        </div>

        <div
          id="bynder-compact-view-wrapper"
          style={{
            background: 'white',
            borderRadius: '4px',
            height: '100%',
            minHeight: '100%',
            minWidth: '100%',
            width: '100%',
            zIndex: drawerZBase + editDepth + 1,
          }}
        >
        </div>
      </div>

    </Modal>
  )
}
