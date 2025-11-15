import type { User } from '@repo/payload-types'

import type {
  CurrentUser,
  UserId,
} from '#auth/current-user/currentUser.model.ts'

export class AuthTransformer {
  static toCurrentUser(dto: User): CurrentUser {
    return {
      id: dto.id as UserId,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
      email: dto.email,
      firstName: dto.firstName ?? null,
      lastName: dto.lastName ?? null,
      preferences: {
        darkMode: dto.darkMode,
      },
      role: dto.role,
    }
  }
}
