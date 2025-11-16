import {
  describe,
  expect,
  it,
} from 'vitest'

import { toCapatilize } from './toCapitalize.util'

describe('toCapatilize', () => {
  it('should return the string with the first letter capitalized', () => {
    expect(toCapatilize('hello')).toBe('Hello')
    expect(toCapatilize('HELLO')).toBe('Hello')
    expect(toCapatilize('hello world')).toBe('Hello world')
    expect(toCapatilize('HEllO wOrld')).toBe('Hello world')
  })
})
