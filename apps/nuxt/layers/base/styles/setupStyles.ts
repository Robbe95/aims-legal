/* eslint-disable eslint-plugin-wisemen/explicit-function-return-type-with-regex */
// import { setupButtonStyle } from '~base/styles/button/button.style'

import { defineComponentVariant } from '@wisemen/vue-core-components'

// Extend the ComponentVariants interface to include the new variant

export function setupStyles() {
  // setupButtonStyle()
  const componentVariants = [
    defineComponentVariant({
      config: {
        root: `
        `,

      },
      target: {
        prop: 'variant',
        value: 'primary',
      },
      theme: 'default',
      component: 'button',
    }),
  ]

  return componentVariants
}

declare module '@wisemen/vue-core-components' {
  interface ComponentVariants {
    variants: ReturnType<typeof setupStyles>
  }
}
