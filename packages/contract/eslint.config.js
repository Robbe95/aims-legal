import WisemenEslintConfig from '@wisemen/eslint-config-vue'

export default [
  ...(await WisemenEslintConfig),
  {
    rules: {
      'project-structure/independent-modules': 'off',
      'ts/explicit-function-return-type': 'off',
    },
  },
]
