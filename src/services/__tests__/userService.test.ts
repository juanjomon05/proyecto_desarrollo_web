// external imports
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// internal imports
import { UserService } from '@/services/userService'
import { AuthService } from '@/services/authService'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('UserService', () => {
  it('getUsers devuelve los usuarios registrados', () => {
    AuthService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })

    expect(UserService.getUsers()).toHaveLength(1)
  })

  it('getUserByCredentials y getUserByEmail encuentran el usuario correcto', () => {
    AuthService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })

    expect(UserService.getUserByCredentials('ana@studeasy.com', '1234')?.name).toBe('Ana Pérez')
    expect(UserService.getUserByCredentials('ana@studeasy.com', 'incorrecta')).toBeNull()
    expect(UserService.getUserByEmail('ana@studeasy.com')?.name).toBe('Ana Pérez')
  })
})
