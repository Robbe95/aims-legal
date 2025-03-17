import path from 'node:path'

// TODO: Fill in seo data
export default defineNuxtConfig({
  alias: {
    '@payload': path.resolve(__dirname, '../payload/src'),
    '@payload-types': path.resolve(__dirname, '../payload'),
    '~base': path.resolve(__dirname, '../base'),
    '~settings': path.resolve(__dirname, './'),
  },
  extends: [
    '../base',
  ],
})
