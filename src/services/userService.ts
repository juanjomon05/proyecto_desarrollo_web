import { useUserStore } from '@/stores/userStore'
import type { UserInterface } from '@/interfaces/UserInterface'
import type { RegisterUserDTO } from '@/dtos/RegisterUserDTO'

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

  static login(email: string, password: string): boolean {
    const user = this.getUserByCredentials(email, password)
    if (!user) return false

    useUserStore().currentUser = user
    return true
  }

  static logout(): void {
    useUserStore().currentUser = null
  }

  static registerUser({ name, email, password }: RegisterUserDTO): UserInterface | null {
    const store = useUserStore()
    if (this.getUserByEmail(email)) return null

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

export function getAllUsers(): UserInterface[] {
  return UserService.getUsers()
}

export function getUserByCredentials(email: string, password: string): UserInterface | null {
  return UserService.getUserByCredentials(email, password)
}

export function registerUser(data: RegisterUserDTO): UserInterface | null {
  return UserService.registerUser(data)
}
