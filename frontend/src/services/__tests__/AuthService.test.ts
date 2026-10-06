// external imports
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios, { AxiosError, type AxiosResponse } from 'axios'

// internal imports
import { AuthService } from '@/services/AuthService'
import type { UserInterface } from '@/interfaces/UserInterface'

vi.mock('axios', async importOriginal => {
  const actual = await importOriginal<typeof import('axios')>()
  return { ...actual, default: { ...actual.default, post: vi.fn() } }
})

const ana: UserInterface = { id: 1, name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234', role: 'student' }

function httpError(status: number): AxiosError {
  return new AxiosError('error', undefined, undefined, undefined, { status } as AxiosResponse)
}

beforeEach(() => {
  setActivePinia(createPinia())
  vi.mocked(axios.post).mockReset()
})

describe('AuthService', () => {
  it('login guarda la sesion cuando el backend acepta las credenciales', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: ana })

    const success = await AuthService.login({ email: 'ana@studeasy.com', password: '1234' })

    expect(success).toBe(true)
    expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/api\/auth\/login$/), { email: 'ana@studeasy.com', password: '1234' })
    expect(AuthService.getCurrentUser()?.email).toBe('ana@studeasy.com')
    expect(AuthService.isLoggedIn()).toBe(true)
    expect(AuthService.isAdmin()).toBe(false)
  })

  it('login devuelve false cuando el backend responde 401', async () => {
    vi.mocked(axios.post).mockRejectedValue(httpError(401))

    expect(await AuthService.login({ email: 'ana@studeasy.com', password: 'mala' })).toBe(false)
    expect(AuthService.isLoggedIn()).toBe(false)
  })

  it('logout limpia la sesion', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: ana })
    await AuthService.login({ email: 'ana@studeasy.com', password: '1234' })

    AuthService.logout()

    expect(AuthService.getCurrentUser()).toBeNull()
  })

  it('registerUser deja la sesion iniciada con el usuario creado', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: ana })

    const user = await AuthService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })

    expect(user?.id).toBe(1)
    expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/api\/auth\/register$/), { name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })
    expect(AuthService.isLoggedIn()).toBe(true)
  })

  it('registerUser devuelve null cuando el correo ya existe (409)', async () => {
    vi.mocked(axios.post).mockRejectedValue(httpError(409))

    expect(await AuthService.registerUser({ name: 'Otra', email: 'ana@studeasy.com', password: 'x' })).toBeNull()
    expect(AuthService.isLoggedIn()).toBe(false)
  })
})
