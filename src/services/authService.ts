// internal imports
import { useUserStore } from '@/stores/userStore'
import type { UserInterface } from '@/interfaces/UserInterface'
import type { RegisterUserDTO } from '@/dtos/RegisterUserDTO'
import { UserService } from '@/services/userService'

export class AuthService {
  // Unica forma en que el resto de la app (vistas, componentes, router) puede saber
  // quien esta logueado, sin importar el store directamente.
  static getCurrentUser(): UserInterface | null {
    return useUserStore().currentUser
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

    useUserStore().currentUser = user
    return true
  }

  static logout(): void {
    useUserStore().currentUser = null
  }

  static registerUser({ name, email, password }: RegisterUserDTO): UserInterface | null {
    const store = useUserStore()
    if (UserService.getUserByEmail(email)) return null

    const user: UserInterface = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: password,
      role: 'student'
    }

    store.users.push(user)
    store.currentUser = user
    return user
  }
}
