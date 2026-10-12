// types
export type UserRole = 'student' | 'admin'

// main interface
export interface UserInterface {
  id: number
  name: string
  email: string
  role: UserRole
}
