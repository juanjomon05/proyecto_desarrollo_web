// src/services/userService.ts
// Lectura y registro de usuarios.

import { User } from '@/models/User'
import type { RegisterUserDTO } from './dtos'

export function getAllUsers(): User[] {
  return User.getAll()
}

export function getUserByCredentials(email: string, password: string): User | null {
  return User.getByCredentials(email, password)
}

// Devuelve null si el correo ya esta registrado.
export function registerUser({ name, email, password }: RegisterUserDTO): User | null {
  return User.register({ name, email, password })
}
