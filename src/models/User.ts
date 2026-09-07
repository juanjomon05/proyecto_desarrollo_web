import { getItem, setItem } from '../services/storage'
import { KEYS, SESSION_KEY } from '../services/storageKeys'
import type { UserData, UserRole } from './types'

function saveRecords(users: UserData[]): void {
  setItem(KEYS.users, users)
}

export class User implements UserData {
  id: string
  name: string
  email: string
  passwordHash: string
  role: UserRole

  constructor({ id, name, email, passwordHash, role }: UserData) {
    this.id = id
    this.name = name
    this.email = email
    this.passwordHash = passwordHash
    this.role = role
  }

  logIn(): User {
    setItem(SESSION_KEY, this.getters())
    return this
  }

  CRUD(): string[] {
    return ['create', 'read', 'update', 'delete']
  }

  getters(): UserData {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      passwordHash: this.passwordHash,
      role: this.role
    }
  }

  setters(changes: Partial<UserData>): User {
    if (changes.id !== undefined) this.id = changes.id
    if (changes.name !== undefined) this.name = changes.name
    if (changes.email !== undefined) this.email = changes.email
    if (changes.passwordHash !== undefined) this.passwordHash = changes.passwordHash
    if (changes.role !== undefined) this.role = changes.role
    return this
  }

  static from(data: UserData | null | undefined): User | null {
    return data ? new User(data) : null
  }

  static getAll(): User[] {
    return (getItem<UserData[]>(KEYS.users) || []).map(user => User.from(user) as User)
  }

  static getByCredentials(email: string, password: string): User | null {
    return User.from(
      User.getAll().find(user => user.email === email && user.passwordHash === password)
    )
  }

  static getByEmail(email: string): User | null {
    return User.from(User.getAll().find(user => user.email === email))
  }

  static register({ name, email, password }: { name: string; email: string; password: string }): User | null {
    if (User.getByEmail(email)) return null

    const users = User.getAll().map(user => user.getters())
    const newUser = new User({
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: password,
      role: 'student'
    })
    users.push(newUser.getters())
    saveRecords(users)
    return newUser
  }
}
