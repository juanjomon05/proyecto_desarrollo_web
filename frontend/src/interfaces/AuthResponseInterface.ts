// internal imports
import type { UserInterface } from '@/interfaces/UserInterface'

// main interface
export interface AuthResponseInterface {
  accessToken: string
  user: UserInterface
}
