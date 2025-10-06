import WisemenEslintConfig from '@wisemen/eslint-config-vue'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...(await WisemenEslintConfig),
  {
    ignores: [
      '**/layers/base/components/core/sonner/Toaster.vue',
      '.nuxt/*',
      'node_modules/*',
      '.vscode/*',
    ],
  },
  {
    rules: {
      'project-structure/independent-modules': 'off',
      'ts/explicit-function-return-type': 'off',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'layers/base/assets/styles/base.css',
      },
    },
  },
)
