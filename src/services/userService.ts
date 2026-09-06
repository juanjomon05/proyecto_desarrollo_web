// src/services/userService.ts
// Lectura de usuarios. En este proyecto los usuarios se siembran en el seed,
// no hay registro publico, asi que solo necesitamos lectura.

import { getItem } from './storage'
import { KEYS } from './init'
import { Usuario } from '@/models/Usuario'
import type { UsuarioData } from '@/models/types'

export function getAllUsers(): Usuario[] {
  return (getItem<UsuarioData[]>(KEYS.users) || []).map(user => Usuario.from(user) as Usuario)
}

export function getUserByCredentials(email: string, password: string): Usuario | null {
  return Usuario.obtenerPorCredenciales(email, password)
}
