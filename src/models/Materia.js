import { getItem, setItem } from '../services/storage.js'
import { KEYS } from '../services/storageKeys.js'

export class Materia {
  constructor({ id = crypto.randomUUID(), name, professor, credits }) {
    this.id = id
    this.name = name
    this.professor = professor
    this.credits = Number(credits)
  }

  static from(data) {
    return data ? new Materia(data) : null
  }

  static obtenerTodas() {
    return (getItem(KEYS.subjects) || []).map(subject => Materia.from(subject))
  }

  static obtenerPorId(id) {
    return Materia.obtenerTodas().find(subject => subject.id === id) || null
  }

  static crear({ name, professor, credits }) {
    const subjects = Materia.obtenerTodas()
    const newSubject = new Materia({ name, professor, credits })
    subjects.push(newSubject)
    setItem(KEYS.subjects, subjects)
    return newSubject
  }

  static actualizar(id, changes) {
    const subjects = Materia.obtenerTodas()
    const index = subjects.findIndex(subject => subject.id === id)
    if (index === -1) return null

    const updatedSubject = new Materia({ ...subjects[index], ...changes })
    subjects[index] = updatedSubject
    setItem(KEYS.subjects, subjects)
    return updatedSubject
  }

  static eliminar(id) {
    const subjects = Materia.obtenerTodas().filter(subject => subject.id !== id)
    setItem(KEYS.subjects, subjects)
  }
}
