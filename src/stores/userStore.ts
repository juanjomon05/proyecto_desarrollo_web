import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInterface } from '@/interfaces/UserInterface'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserInterface[]>([])
  const currentUser = ref<UserInterface | null>(null)

  const isLoggedIn = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  function login(email: string, password: string): boolean {
    const user = users.value.find(item => item.email === email && item.passwordHash === password)
    if (!user) return false

    currentUser.value = user
    return true
  }

  function logout(): void {
    currentUser.value = null
  }

  function register(name: string, email: string, password: string): boolean {
    if (users.value.some(item => item.email === email)) return false

    const user: UserInterface = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: password,
      role: 'student'
    }

    users.value.push(user)
    currentUser.value = user
    return true
  }

  return { users, currentUser, isLoggedIn, isAdmin, login, logout, register }
})
