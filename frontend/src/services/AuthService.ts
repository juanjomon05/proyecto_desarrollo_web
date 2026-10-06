// external imports
import axios from 'axios'

// internal imports
import { useAuthStore } from '@/stores/AuthStore'
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
      const { data } = await axios.post<UserInterface>(`${this.API_URL}/login`, credentials)
      useAuthStore().currentUser = data
      return true
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) return false
      throw error
    }
  }

  static logout(): void {
    useAuthStore().currentUser = null
  }

  static async registerUser(user: RegisterUserDTO): Promise<UserInterface | null> {
    try {
      const { data } = await axios.post<UserInterface>(`${this.API_URL}/register`, user)
      useAuthStore().currentUser = data
      return data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) return null
      throw error
    }
  }
}
