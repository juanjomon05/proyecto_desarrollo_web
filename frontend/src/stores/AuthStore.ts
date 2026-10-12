// external imports
import { defineStore } from 'pinia'
import { ref } from 'vue'

// internal imports
import type { UserInterface } from '@/interfaces/UserInterface'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserInterface | null>(null)
  const token = ref<string | null>(null)

  return { currentUser, token }
})
