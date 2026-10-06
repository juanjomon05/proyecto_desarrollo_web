export type UserRole = 'student' | 'admin'

export interface UserInterface {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
}
