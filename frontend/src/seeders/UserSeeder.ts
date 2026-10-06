// internal imports
import type { UserInterface } from '@/interfaces/UserInterface'

export const userSeeder: UserInterface[] = [
  { id: 1, name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234', role: 'student' },
  { id: 2, name: 'Admin StudEasy', email: 'admin@studeasy.com', password: 'admin', role: 'admin' }
]
