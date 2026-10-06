// internal imports
import type { UserInterface } from '@/interfaces/UserInterface'

export const userSeeder: UserInterface[] = [
  { id: 'u1', name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234', role: 'student' },
  { id: 'u2', name: 'Admin StudEasy', email: 'admin@studeasy.com', password: 'admin', role: 'admin' }
]
