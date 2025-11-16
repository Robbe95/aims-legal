import { z } from 'zod'

export const lexicalTextNodeSchema = z.object({
  format: z.number(),
  text: z.string().optional(),
  type: z.literal('text'),
})

export type LexicalTextNode = z.infer<typeof lexicalTextNodeSchema>

export const IS_BOLD = 1
export const IS_ITALIC = 1 << 1
export const IS_STRIKETHROUGH = 1 << 2
export const IS_UNDERLINE = 1 << 3
export const IS_CODE = 1 << 4
export const IS_SUBSCRIPT = 1 << 5
export const IS_SUPERSCRIPT = 1 << 6
export const IS_HIGHLIGHT = 1 << 7
export const IS_LOWERCASE = 1 << 8
export const IS_UPPERCASE = 1 << 9
export const IS_CAPITALIZE = 1 << 10

export type TextFormatType
  = | 'bold'
    | 'capitalize'
    | 'code'
    | 'highlight'
    | 'italic'
    | 'lowercase'
    | 'strikethrough'
    | 'subscript'
    | 'superscript'
    | 'underline'
    | 'uppercase'

export const TEXT_TYPE_TO_FORMAT: Record<string | TextFormatType, number> = {
  bold: IS_BOLD,
  capitalize: IS_CAPITALIZE,
  code: IS_CODE,
  highlight: IS_HIGHLIGHT,
  italic: IS_ITALIC,
  lowercase: IS_LOWERCASE,
  strikethrough: IS_STRIKETHROUGH,
  subscript: IS_SUBSCRIPT,
  superscript: IS_SUPERSCRIPT,
  underline: IS_UNDERLINE,
  uppercase: IS_UPPERCASE,
}

export function hasFormat(type: TextFormatType, format: number): boolean {
  const formatFlag = TEXT_TYPE_TO_FORMAT[type]

  if (formatFlag === undefined) {
    return false
  }

  return (format & formatFlag) !== 0
}
