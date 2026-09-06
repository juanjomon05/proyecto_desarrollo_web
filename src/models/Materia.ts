import { getItem, setItem } from '../services/storage'
import { KEYS } from '../services/storageKeys'
import type { MateriaData } from './types'

export class Materia {
  id: string
  name: string
  professor: string
  credits: number

  constructor({ id = crypto.randomUUID(), name, professor, credits }: MateriaData) {
    this.id = id
    this.name = name
    this.professor = professor
    this.credits = Number(credits)
  }

  static from(data: MateriaData | null | undefined): Materia | null {
    return data ? new Materia(data) : null
  }

  static obtenerTodas(): Materia[] {
    return (getItem<MateriaData[]>(KEYS.subjects) || []).map(subject => Materia.from(subject) as Materia)
  }

  static obtenerPorId(id: string): Materia | null {
    return Materia.obtenerTodas().find(subject => subject.id === id) || null
  }

  static crear({ name, professor, credits }: Pick<MateriaData, 'name' | 'professor' | 'credits'>): Materia {
    const subjects = Materia.obtenerTodas()
    const newSubject = new Materia({ name, professor, credits })
    subjects.push(newSubject)
    setItem(KEYS.subjects, subjects)
    return newSubject
  }

  static actualizar(id: string, changes: Partial<MateriaData>): Materia | null {
    const subjects = Materia.obtenerTodas()
    const index = subjects.findIndex(subject => subject.id === id)
    if (index === -1) return null

    const updatedSubject = new Materia({ ...subjects[index], ...changes })
    subjects[index] = updatedSubject
    setItem(KEYS.subjects, subjects)
    return updatedSubject
  }

  static eliminar(id: string): void {
    const subjects = Materia.obtenerTodas().filter(subject => subject.id !== id)
    setItem(KEYS.subjects, subjects)
  }
}
