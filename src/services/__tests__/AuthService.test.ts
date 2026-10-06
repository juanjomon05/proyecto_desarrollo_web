// external imports
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// internal imports
import { AuthService } from '@/services/AuthService'
import { UserService } from '@/services/UserService'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('AuthService', () => {
  it('registerUser crea una cuenta nueva como estudiante', () => {
    const user = AuthService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })

    expect(user).not.toBeNull()
    expect(user?.role).toBe('student')
    expect(UserService.getUsers()).toHaveLength(1)
  })

  it('registerUser rechaza un correo ya registrado', () => {
    AuthService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })

    const duplicate = AuthService.registerUser({ name: 'Otra Ana', email: 'ana@studeasy.com', password: 'abcd' })

    expect(duplicate).toBeNull()
    expect(UserService.getUsers()).toHaveLength(1)
  })

  it('login deja la sesion activa y logout la limpia', () => {
    AuthService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })
    AuthService.logout()

    expect(AuthService.isLoggedIn()).toBe(false)

    const success = AuthService.login('ana@studeasy.com', '1234')

    expect(success).toBe(true)
    expect(AuthService.isLoggedIn()).toBe(true)
    expect(AuthService.getCurrentUser()?.email).toBe('ana@studeasy.com')

    AuthService.logout()

    expect(AuthService.isLoggedIn()).toBe(false)
    expect(AuthService.getCurrentUser()).toBeNull()
  })

  it('login devuelve false con credenciales incorrectas', () => {
    // registerUser deja la sesion iniciada (igual que en la app real), asi que
    // cerramos sesion primero para probar el login fallido desde cero.
    AuthService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })
    AuthService.logout()

    expect(AuthService.login('ana@studeasy.com', 'mala')).toBe(false)
    expect(AuthService.isLoggedIn()).toBe(false)
  })

  it('isAdmin es true solo para el rol admin', () => {
    AuthService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })
    AuthService.login('ana@studeasy.com', '1234')

    expect(AuthService.isAdmin()).toBe(false)
  })
})
