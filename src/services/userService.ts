// src/services/userService.ts
// CRUD de User. Ninguna view debe llamar a storage.ts ni al modelo directamente,
// siempre pasa por aqui.

import { User } from '@/models/User'
import type { UserRole } from '@/models/types'

export function getAllUsers(): User[] {
  return User.getAll()
}

export function getUserByCredentials(email: string, password: string): User | null {
  return User.getByCredentials(email, password)
}

export function getUserByEmail(email: string): User | null {
  return User.getByEmail(email)
}

export function registerUser({ name, email, password }: { name: string; email: string; password: string }): User {
  if (User.getByEmail(email)) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }
  return User.create({ name, email, password })
}

export function resetPassword(email: string, newPassword: string): boolean {
  const user = User.getByEmail(email)
  if (!user) return false
  User.update(user.id, { passwordHash: newPassword })
  return true
}

export function deleteUser(id: string): void {
  const user = User.getAll().find(u => u.id === id)
  if (user?.role === 'admin') {
    throw new Error('No se puede eliminar una cuenta de administrador.')
  }
  User.delete(id)
}

export function updateUserRole(id: string, role: UserRole): void {
  User.update(id, { role })
}
