'use client'
import { BynderModal } from '@payload/components/upload/BynderModal'
import {
  Button,
  useModal,
  useUploadControls,
} from '@payloadcms/ui'
import Script from 'next/script'
import React, {
  Fragment,
  useCallback,
  useState,
} from 'react'

export function customUpload() {
  const modal = useModal()

  const {
    setUploadControlFileUrl,
  } = useUploadControls()

  const loadFromUrl = useCallback((url: string) => {
    setUploadControlFileUrl(url)
  }, [
    setUploadControlFileUrl,
  ])

  const slug = 'bynder-compact-view'
  const [
    isBynderLoaded,
    setIsBynderLoaded,
  ] = useState(false)

  function loadBynder() {
    // @ts-expect-error - byndercompactview is a global variable provided by the script
    byndercompactview.openCompactView({
      assetTypes: [
        'IMAGE',
      ],
      container: document.querySelector(`#bynder-compact-view-wrapper`),
      modalStyles: {
        display: 'flex',
        height: '70%',
        items: 'center',
        justifyContent: 'center',
        margin: 'auto',
        width: '80%',
        zIndex: 1000,
      },
      mode: 'SingleSelectFile',
      portal: {
        url: 'media.kreon.com',
      },
      onSuccess(assets: { files: {
        'Resize HD': { url: string }
        'webImage': { url: string }
        'Website': { url: string }
      } }[]) {
        let selectedImage = assets[0]?.files?.['Resize HD']?.url

        if (!selectedImage) {
          selectedImage = assets[0]?.files?.Website?.url
        }

        if (!selectedImage) {
          selectedImage = assets[0]?.files?.webImage?.url
        }

        if (!selectedImage) {
          console.error('No valid image found in selected assets')

          return
        }

        loadFromUrl(selectedImage)
      },
    })
  }

  function handleBynderLoad() {
    loadBynder()
  }

  function initializeBynder() {
    setIsBynderLoaded(true)
  }

  function loadFromBynder() {
    modal.openModal(slug)
  }

  return (
    <Fragment>
      <Script
        onReady={initializeBynder}
        src="https://ucv.bynder.com/5.0.5/modules/compactview/bynder-compactview-3-latest.js"
      />

      <BynderModal
        handleBynderLoad={handleBynderLoad}
        modalSlug={slug}
      />
      <div style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        justifyContent: 'center',
      }}
      >
        <span style={{
          color: 'var(--theme-elevation-500)',
        }}
        >
          or
        </span>
        <Button
          id="load-from-file-upload-button"
          disabled={!isBynderLoaded}
          buttonStyle="pill"
          iconStyle="without-border"
          size="small"
          onClick={loadFromBynder}
        >
          Select from Bynder
        </Button>
        <br />
        <div>
        </div>

      </div>
    </Fragment>
  )
}
