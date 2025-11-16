import { setupStyles } from '~base/styles/setupStyles'

export default defineNuxtPlugin({
  name: 'style',
  setup() {
    setupStyles()
  },
})
