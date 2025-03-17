import { z } from 'zod'

export const userIdSchema = z.string().brand('userId')
export const darkModeSchema = z.enum([
  'light',
  'dark',
  'system',
])
export const userRoleSchema = z.enum([
  'super-admin',
  'user',
  'admin',
  'editor',
])
export const currentUserSchema = z.object({
  id: userIdSchema,
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  preferences: z.object({
    darkMode: darkModeSchema,
  }),
  role: userRoleSchema,
})

export type CurrentUser = z.infer<typeof currentUserSchema>
export type UserId = z.infer<typeof userIdSchema>
export type DarkMode = z.infer<typeof darkModeSchema>
export type UserRole = z.infer<typeof userRoleSchema>
