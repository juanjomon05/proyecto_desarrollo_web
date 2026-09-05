import { getItem, removeItem, setItem } from '../services/storage.js'
import { KEYS, SESSION_KEY } from '../services/storageKeys.js'

export class Usuario {
  constructor({ id, name, email, passwordHash, role }) {
    this.id = id
    this.name = name
    this.email = email
    this.passwordHash = passwordHash
    this.role = role
  }

  iniciarSesion() {
    setItem(SESSION_KEY, this)
    return this
  }

  cerrarSesion() {
    removeItem(SESSION_KEY)
  }

  static from(data) {
    return data ? new Usuario(data) : null
  }

  static obtenerPorCredenciales(email, password) {
    const users = getItem(KEYS.users) || []
    return Usuario.from(
      users.find(user => user.email === email && user.passwordHash === password)
    )
  }
}
