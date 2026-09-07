// src/stores/userStore.ts
// Estado global: quien esta logueado ahora mismo.
// Las views nunca leen localStorage directo, siempre pasan por aqui.

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem, removeItem } from '@/services/storage'
import { SESSION_KEY } from '@/services/storageKeys'
import { getUserByCredentials, registerUser } from '@/services/userService'
import { User } from '@/models/User'
import type { UserData } from '@/models/types'

export const useUserStore = defineStore('user', () => {
  // --- Estado (interno y externo) ---
  // currentUser: instancia de User de la sesion activa, o null si nadie ha iniciado
  // sesion. Se inicializa leyendo SESSION_KEY de localStorage (sesion persistida entre
  // recargas), y contiene { id, name, email, passwordHash, role }. Se expone completo
  // porque las vistas lo usan tanto para mostrar datos (name, email) como para el
  // guard de rutas (role).
  const currentUser = ref(User.from(getItem<UserData>(SESSION_KEY)))

  // --- Getters (externos, derivados del estado) ---
  const isLoggedIn = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  // --- Acciones (externas) ---
  function login(email: string, password: string): boolean {
    const user = getUserByCredentials(email, password)
    if (!user) return false

    currentUser.value = user
    user.logIn()
    return true
  }

  function logout(): void {
    removeItem(SESSION_KEY)
    currentUser.value = null
  }

  // Registra un estudiante nuevo (el rol admin solo se asigna por seed, no autoregistro)
  // y lo deja logueado. Devuelve false si el correo ya esta en uso.
  function register(name: string, email: string, password: string): boolean {
    const user = registerUser({ name, email, password })
    if (!user) return false

    currentUser.value = user
    user.logIn()
    return true
  }

  // Este store no tiene estado ni funciones internas (todo lo definido arriba se usa
  // fuera del store). El return se ordena por grupo logico: estado -> getters -> acciones.
  return { currentUser, isLoggedIn, isAdmin, login, logout, register }
})
