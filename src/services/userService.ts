// src/services/userService.ts
// Lectura de usuarios. En este proyecto los usuarios se siembran en el seed,
// no hay registro publico, asi que solo necesitamos lectura.

import { User } from '@/models/User'

export function getAllUsers(): User[] {
  return User.getAll()
}

export function getUserByCredentials(email: string, password: string): User | null {
  return User.getByCredentials(email, password)
}
