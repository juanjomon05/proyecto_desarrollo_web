import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInterface } from '@/interfaces/UserInterface'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserInterface[]>([])
  const currentUser = ref<UserInterface | null>(null)

  return { users, currentUser }
})
