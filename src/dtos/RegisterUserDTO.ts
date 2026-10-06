// internal imports
import type { UserInterface } from '@/interfaces/UserInterface'

export type RegisterUserDTO = Pick<UserInterface, 'name' | 'email' | 'password'>
