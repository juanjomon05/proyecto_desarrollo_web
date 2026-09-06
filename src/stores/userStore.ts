// src/stores/userStore.ts
// Estado global: quien esta logueado ahora mismo.
// Las views nunca leen localStorage directo, siempre pasan por aqui.

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem } from '@/services/storage'
import { SESSION_KEY } from '@/services/storageKeys'
import { getUserByCredentials } from '@/services/userService'
import { Usuario } from '@/models/Usuario'
import type { UsuarioData } from '@/models/types'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(Usuario.from(getItem<UsuarioData>(SESSION_KEY)))

  const isLoggedIn = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  function login(email: string, password: string): boolean {
    const user = getUserByCredentials(email, password)
    if (!user) return false

    currentUser.value = user
    user.iniciarSesion()
    return true
  }

  function logout(): void {
    currentUser.value?.cerrarSesion()
    currentUser.value = null
  }

  return { currentUser, isLoggedIn, isAdmin, login, logout }
})
