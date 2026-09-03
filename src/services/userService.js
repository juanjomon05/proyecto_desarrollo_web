// src/services/userService.js
// Lectura de usuarios. En este proyecto los usuarios se siembran en el seed,
// no hay registro publico, asi que solo necesitamos lectura.

import { getItem } from './storage'
import { KEYS } from './init'

export function getAllUsers() {
  return getItem(KEYS.users) || []
}

export function getUserByCredentials(email, password) {
  return getAllUsers().find(
    user => user.email === email && user.passwordHash === password
  ) || null
}