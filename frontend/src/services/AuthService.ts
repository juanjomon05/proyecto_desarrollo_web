// external imports
import axios from 'axios'

// internal imports
import { useAuthStore } from '@/stores/AuthStore'
import type { AuthResponseInterface } from '@/interfaces/AuthResponseInterface'
import type { UserInterface } from '@/interfaces/UserInterface'
import type { LoginDTO } from '@/dtos/LoginDTO'
import type { RegisterUserDTO } from '@/dtos/RegisterUserDTO'

export class AuthService {
  private static readonly API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`

  static getCurrentUser(): UserInterface | null {
    return useAuthStore().currentUser
  }

  static isLoggedIn(): boolean {
    return this.getCurrentUser() !== null
  }

  static isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin'
  }

  static async login(credentials: LoginDTO): Promise<boolean> {
    try {
      const { data } = await axios.post<AuthResponseInterface>(`${this.API_URL}/login`, credentials)
      this.startSession(data)
      return true
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) return false
      throw error
    }
  }

  static logout(): void {
    const store = useAuthStore()
    store.currentUser = null
    store.token = null
    delete axios.defaults.headers.common.Authorization
  }

  static async registerUser(user: RegisterUserDTO): Promise<UserInterface | null> {
    try {
      const { data } = await axios.post<AuthResponseInterface>(`${this.API_URL}/register`, user)
      this.startSession(data)
      return data.user
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) return null
      throw error
    }
  }

  // Al abrir la app: vuelve a enviar el token guardado y, si el backend lo rechaza
  // porque vencio, cierra la sesion y avisa con onExpired.
  static restoreSession(onExpired: () => void): void {
    const { token } = useAuthStore()
    if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`

    axios.interceptors.response.use(
      response => response,
      error => {
        if (axios.isAxiosError(error) && error.response?.status === 401 && this.isLoggedIn()) {
          this.logout()
          onExpired()
          // La vista que hizo la peticion se desmonta al ir a /login; no se rechaza la
          // promesa para que no quede como un error sin manejar en la consola.
          return new Promise(() => {})
        }
        return Promise.reject(error)
      }
    )
  }

  // private helpers
  private static startSession({ accessToken, user }: AuthResponseInterface): void {
    const store = useAuthStore()
    store.currentUser = user
    store.token = accessToken
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }
}
