// internal imports
import { useUserStore } from '@/stores/UserStore'
import type { UserInterface } from '@/interfaces/UserInterface'

export class UserService {
  static getUsers(): UserInterface[] {
    return useUserStore().users
  }

  static getUserByCredentials(email: string, password: string): UserInterface | null {
    return this.getUsers().find(user => user.email === email && user.passwordHash === password) || null
  }

  static getUserByEmail(email: string): UserInterface | null {
    return this.getUsers().find(user => user.email === email) || null
  }
}
