// internal imports
import { useUserStore } from '@/stores/UserStore'
import type { UserInterface } from '@/interfaces/UserInterface'
import type { CreateUserDTO } from '@/dtos/CreateUserDTO'

export class UserService {
  static getUsers(): UserInterface[] {
    return useUserStore().users
  }

  static getUserByCredentials(email: string, password: string): UserInterface | null {
    return this.getUsers().find(user => user.email === email && user.password === password) || null
  }

  static getUserByEmail(email: string): UserInterface | null {
    return this.getUsers().find(user => user.email === email) || null
  }

  static createUser(user: CreateUserDTO): UserInterface {
    const createdUser: UserInterface = {
      id: crypto.randomUUID(),
      ...user
    }

    useUserStore().users.push(createdUser)
    return createdUser
  }
}
