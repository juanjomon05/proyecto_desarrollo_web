// external imports
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios, { AxiosError, type AxiosResponse } from 'axios'

// internal imports
import { AuthService } from '@/services/AuthService'
import type { AuthResponseInterface } from '@/interfaces/AuthResponseInterface'

vi.mock('axios', async importOriginal => {
  const actual = await importOriginal<typeof import('axios')>()
  return { ...actual, default: { ...actual.default, post: vi.fn() } }
})

const anaSession: AuthResponseInterface = {
  accessToken: 'token-de-ana',
  user: { id: 1, name: 'Ana Pérez', email: 'ana@studeasy.com', role: 'student' }
}

function httpError(status: number): AxiosError {
  return new AxiosError('error', undefined, undefined, undefined, { status } as AxiosResponse)
}

beforeEach(() => {
  setActivePinia(createPinia())
  vi.mocked(axios.post).mockReset()
  delete axios.defaults.headers.common.Authorization
})

describe('AuthService', () => {
  it('login guarda la sesion y envia el token en las siguientes peticiones', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: anaSession })

    const success = await AuthService.login({ email: 'ana@studeasy.com', password: '1234' })

    expect(success).toBe(true)
    expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/api\/auth\/login$/), { email: 'ana@studeasy.com', password: '1234' })
    expect(AuthService.getCurrentUser()?.email).toBe('ana@studeasy.com')
    expect(AuthService.isLoggedIn()).toBe(true)
    expect(AuthService.isAdmin()).toBe(false)
    expect(axios.defaults.headers.common.Authorization).toBe('Bearer token-de-ana')
  })

  it('login devuelve false cuando el backend responde 401', async () => {
    vi.mocked(axios.post).mockRejectedValue(httpError(401))

    expect(await AuthService.login({ email: 'ana@studeasy.com', password: 'mala' })).toBe(false)
    expect(AuthService.isLoggedIn()).toBe(false)
  })

  it('logout limpia la sesion y deja de enviar el token', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: anaSession })
    await AuthService.login({ email: 'ana@studeasy.com', password: '1234' })

    AuthService.logout()

    expect(AuthService.getCurrentUser()).toBeNull()
    expect(axios.defaults.headers.common.Authorization).toBeUndefined()
  })

  it('registerUser deja la sesion iniciada con el usuario creado', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: anaSession })

    const user = await AuthService.registerUser({ name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })

    expect(user?.id).toBe(1)
    expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/api\/auth\/register$/), { name: 'Ana Pérez', email: 'ana@studeasy.com', password: '1234' })
    expect(AuthService.isLoggedIn()).toBe(true)
    expect(axios.defaults.headers.common.Authorization).toBe('Bearer token-de-ana')
  })

  it('registerUser devuelve null cuando el correo ya existe (409)', async () => {
    vi.mocked(axios.post).mockRejectedValue(httpError(409))

    expect(await AuthService.registerUser({ name: 'Otra', email: 'ana@studeasy.com', password: 'x' })).toBeNull()
    expect(AuthService.isLoggedIn()).toBe(false)
  })
})
