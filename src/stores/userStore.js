// src/stores/userStore.js
// Estado global: quien esta logueado ahora mismo.
// Las views nunca leen localStorage directo, siempre pasan por aqui.

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getItem, setItem, removeItem } from '@/services/storage'
import { getUserByCredentials } from '@/services/userService'

const SESSION_KEY = 'studeasy_session'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(getItem(SESSION_KEY))

  const isLoggedIn = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  function login(email, password) {
    const user = getUserByCredentials(email, password)
    if (!user) return false

    currentUser.value = user
    setItem(SESSION_KEY, user)
    return true
  }

  function logout() {
    currentUser.value = null
    removeItem(SESSION_KEY)
  }

  return { currentUser, isLoggedIn, isAdmin, login, logout }
})