import WisemenEslintConfig from '@wisemen/eslint-config-vue'
import type { Linter } from 'eslint'

const wisemenConfig = (await WisemenEslintConfig) as Linter.FlatConfig[]

const config: Linter.Config[] = [
  ...wisemenConfig,
  {
    rules: {
      'better-tailwindcss/no-unregistered-classes': 'off',
      'check-file/folder-naming-convention': 'off',
      'eslint-plugin-wisemen/explicit-function-return-type-with-regex': 'off',
      'project-structure/independent-modules': 'off',
      'ts/explicit-function-return-type': 'off',
      'unicorn/no-empty-file': 'off',
    },
  },
  {
    ignores: [
      '**/app/(payload)',
      '**/migrations',
      '**/payload-types.ts',
      '**/.turbo',
    ],
  },
]

export default config
