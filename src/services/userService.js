// src/services/userService.js
// Lectura de usuarios. En este proyecto los usuarios se siembran en el seed,
// no hay registro publico, asi que solo necesitamos lectura.

import { getItem } from './storage'
import { KEYS } from './init'
import { Usuario } from '@/models/Usuario'

export function getAllUsers() {
  return (getItem(KEYS.users) || []).map(user => Usuario.from(user))
}

export function getUserByCredentials(email, password) {
  return Usuario.obtenerPorCredenciales(email, password)
}
