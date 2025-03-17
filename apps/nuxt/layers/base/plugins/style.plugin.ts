import {
  defineStyleConfig,
  setStyleConfigSsrCallback,
  setupDefaultStyles,
} from '@wisemen/vue-core'

export default defineNuxtPlugin({
  name: 'style',
  setup(nuxt) {
    setStyleConfigSsrCallback((styleNode) => {
      nuxt.ssrContext?.head.push?.({
        style: [
          styleNode,
        ],
      })
    })

    if (nuxt.ssrContext != null) {
      setupDefaultStyles()
      defineStyleConfig({
        colorScheme: '*',
        config: {
          '--button-bg-color-default': 'red',
        },
        theme: 'dark',
        variant: 'default',
        component: 'button',
      })
    }
  },
})
