import path from 'node:path'

export default defineNuxtConfig({
  alias: {
    '~base': path.resolve(__dirname, '../base'),
    '~cms': path.resolve(__dirname, '../cms'),
  },
  components: [],
  extends: [
    '../base',
  ],
})
