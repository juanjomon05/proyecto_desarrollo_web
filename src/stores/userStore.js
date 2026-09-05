// src/stores/userStore.js
// Estado global: quien esta logueado ahora mismo.
// Las views nunca leen localStorage directo, siempre pasan por aqui.

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem } from '@/services/storage'
import { SESSION_KEY } from '@/services/storageKeys'
import { getUserByCredentials } from '@/services/userService'
import { Usuario } from '@/models/Usuario'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(Usuario.from(getItem(SESSION_KEY)))

  const isLoggedIn = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  function login(email, password) {
    const user = getUserByCredentials(email, password)
    if (!user) return false

    currentUser.value = user
    user.iniciarSesion()
    return true
  }

  function logout() {
    currentUser.value?.cerrarSesion()
    currentUser.value = null
  }

  return { currentUser, isLoggedIn, isAdmin, login, logout }
})
