import { getItem, removeItem, setItem } from '../services/storage'
import { KEYS, SESSION_KEY } from '../services/storageKeys'
import type { UsuarioData } from './types'

export class Usuario {
  id: string
  name: string
  email: string
  passwordHash: string
  role: UsuarioData['role']

  constructor({ id, name, email, passwordHash, role }: UsuarioData) {
    this.id = id
    this.name = name
    this.email = email
    this.passwordHash = passwordHash
    this.role = role
  }

  iniciarSesion(): Usuario {
    setItem(SESSION_KEY, this)
    return this
  }

  cerrarSesion(): void {
    removeItem(SESSION_KEY)
  }

  static from(data: UsuarioData | null | undefined): Usuario | null {
    return data ? new Usuario(data) : null
  }

  static obtenerPorCredenciales(email: string, password: string): Usuario | null {
    const users = getItem<UsuarioData[]>(KEYS.users) || []
    return Usuario.from(
      users.find(user => user.email === email && user.passwordHash === password)
    )
  }
}
