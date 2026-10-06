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
    const store = useUserStore()
    const createdUser: UserInterface = {
      id: Math.max(0, ...store.users.map(item => item.id)) + 1,
      ...user
    }

    store.users.push(createdUser)
    return createdUser
  }
}
