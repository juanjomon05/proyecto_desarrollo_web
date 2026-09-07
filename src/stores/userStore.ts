// src/stores/userStore.ts
// Estado global: quien esta logueado ahora mismo.
// Las views nunca leen localStorage directo, siempre pasan por aqui.

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem, removeItem } from '@/services/storage'
import { SESSION_KEY } from '@/services/storageKeys'
import { getUserByCredentials } from '@/services/userService'
import { User } from '@/models/User'
import type { UserData } from '@/models/types'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(User.from(getItem<UserData>(SESSION_KEY)))

  const isLoggedIn = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  function login(email: string, password: string): boolean {
    const user = getUserByCredentials(email, password)
    if (!user) return false

    currentUser.value = user
    user.login()
    return true
  }

  function logout(): void {
    removeItem(SESSION_KEY)
    currentUser.value = null
  }

  return { currentUser, isLoggedIn, isAdmin, login, logout }
})
