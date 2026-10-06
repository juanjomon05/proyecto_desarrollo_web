// internal imports
import { useAuthStore } from '@/stores/AuthStore'
import { UserService } from '@/services/UserService'
import type { UserInterface } from '@/interfaces/UserInterface'
import type { RegisterUserDTO } from '@/dtos/RegisterUserDTO'

export class AuthService {
  static getCurrentUser(): UserInterface | null {
    return useAuthStore().currentUser
  }

  static isLoggedIn(): boolean {
    return this.getCurrentUser() !== null
  }

  static isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin'
  }

  static login(email: string, password: string): boolean {
    const user = UserService.getUserByCredentials(email, password)
    if (!user) return false

    useAuthStore().currentUser = user
    return true
  }

  static logout(): void {
    useAuthStore().currentUser = null
  }

  static registerUser({ name, email, password }: RegisterUserDTO): UserInterface | null {
    if (UserService.getUserByEmail(email)) return null

    const user = UserService.createUser({ name, email, password, role: 'student' })

    useAuthStore().currentUser = user
    return user
  }
}
