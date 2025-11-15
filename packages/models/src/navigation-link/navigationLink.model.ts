import { z } from 'zod'

import { clientLinkSchema } from '#link/link.model.ts'

export const baseClientNavigationLinkSchema = z.object({
  label: z.string(),
})
export const clientNavigationLinkRelationSchema = baseClientNavigationLinkSchema.extend({
  label: z.string(),
  link: clientLinkSchema,
  navType: z.literal('link'),
})

export const clientNavigationLinkWithCategoriesSchema = baseClientNavigationLinkSchema.extend({
  categories: clientNavigationLinkRelationSchema.array(),
  label: z.string(),
  link: clientLinkSchema,
  navType: z.literal('linkWithDropdown'),
})

export const clientNavigationEventSchema = baseClientNavigationLinkSchema.extend({
  event: z.enum([
    'some_form',
  ]),
  label: z.string(),
  navType: z.literal('event'),
})

export const clientNavigationDropdownSchema = baseClientNavigationLinkSchema.extend({
  label: z.string(),
  links: z.array(clientNavigationLinkWithCategoriesSchema),
  navType: z.literal('dropdown'),
})

export const clientNavigationLinkSchema = z.discriminatedUnion('navType', [
  clientNavigationLinkRelationSchema,
  clientNavigationEventSchema,
  clientNavigationDropdownSchema,
  clientNavigationLinkWithCategoriesSchema,
])

export type ClientNavigationLink = z.infer<typeof clientNavigationLinkSchema>
export type ClientNavigationLinkRelation = z.infer<typeof clientNavigationLinkRelationSchema>
export type ClientNavigationEvent = z.infer<typeof clientNavigationEventSchema>
export type ClientNavigationDropdown = z.infer<typeof clientNavigationDropdownSchema>
export type ClientNavigationLinkWithCategories = z.infer<typeof clientNavigationLinkWithCategoriesSchema>
