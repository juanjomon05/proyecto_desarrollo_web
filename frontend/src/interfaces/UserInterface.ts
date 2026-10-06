// types
export type UserRole = 'student' | 'admin'

// main interface
export interface UserInterface {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
}
