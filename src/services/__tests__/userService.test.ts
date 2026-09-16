// external imports
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// internal imports
import { UserService } from '@/services/userService'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('UserService', () => {
  it('registerUser crea una cuenta nueva como estudiante', () => {
    const user = UserService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })

    expect(user).not.toBeNull()
    expect(user?.role).toBe('student')
    expect(UserService.getUsers()).toHaveLength(1)
  })

  it('registerUser rechaza un correo ya registrado', () => {
    UserService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })

    const duplicate = UserService.registerUser({ name: 'Otra Ana', email: 'ana@studeasy.com', password: 'abcd' })

    expect(duplicate).toBeNull()
    expect(UserService.getUsers()).toHaveLength(1)
  })

  it('getUserByCredentials y getUserByEmail encuentran el usuario correcto', () => {
    UserService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })

    expect(UserService.getUserByCredentials('ana@studeasy.com', '1234')?.name).toBe('Ana Pérez')
    expect(UserService.getUserByCredentials('ana@studeasy.com', 'incorrecta')).toBeNull()
    expect(UserService.getUserByEmail('ana@studeasy.com')?.name).toBe('Ana Pérez')
  })

  it('login deja la sesion activa y logout la limpia', () => {
    UserService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })
    UserService.logout()

    expect(UserService.isLoggedIn()).toBe(false)

    const success = UserService.login('ana@studeasy.com', '1234')

    expect(success).toBe(true)
    expect(UserService.isLoggedIn()).toBe(true)
    expect(UserService.getCurrentUser()?.email).toBe('ana@studeasy.com')

    UserService.logout()

    expect(UserService.isLoggedIn()).toBe(false)
    expect(UserService.getCurrentUser()).toBeNull()
  })

  it('login devuelve false con credenciales incorrectas', () => {
    // registerUser deja la sesion iniciada (igual que en la app real), asi que
    // cerramos sesion primero para probar el login fallido desde cero.
    UserService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })
    UserService.logout()

    expect(UserService.login('ana@studeasy.com', 'mala')).toBe(false)
    expect(UserService.isLoggedIn()).toBe(false)
  })

  it('isAdmin es true solo para el rol admin', () => {
    UserService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })
    UserService.login('ana@studeasy.com', '1234')

    expect(UserService.isAdmin()).toBe(false)
  })
})
