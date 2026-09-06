import { getItem, setItem } from '../services/storage'
import { KEYS } from '../services/storageKeys'
import type { ActividadData, ActivityStatus, ActivityType } from './types'

export class Actividad {
  id: string
  subjectId: string
  title: string
  type: ActivityType
  dueDate: string
  status: ActivityStatus
  grade: number | null

  constructor({
    id = crypto.randomUUID(),
    subjectId,
    title,
    type,
    dueDate,
    status = 'pendiente',
    grade = null
  }: ActividadData) {
    this.id = id
    this.subjectId = subjectId
    this.title = title
    this.type = type
    this.dueDate = dueDate
    this.status = status
    this.grade = grade === '' || grade === null || grade === undefined ? null : Number(grade)
  }

  static from(data: ActividadData | null | undefined): Actividad | null {
    return data ? new Actividad(data) : null
  }

  static obtenerTodas(): Actividad[] {
    return (getItem<ActividadData[]>(KEYS.activities) || []).map(activity => Actividad.from(activity) as Actividad)
  }

  static obtenerPorMateria(subjectId: string): Actividad[] {
    return Actividad.obtenerTodas().filter(activity => activity.subjectId === subjectId)
  }

  static obtenerPorId(id: string): Actividad | null {
    return Actividad.obtenerTodas().find(activity => activity.id === id) || null
  }

  static crear({ subjectId, title, type, dueDate }: Pick<ActividadData, 'subjectId' | 'title' | 'type' | 'dueDate'>): Actividad {
    const activities = Actividad.obtenerTodas()
    const newActivity = new Actividad({ subjectId, title, type, dueDate })
    activities.push(newActivity)
    setItem(KEYS.activities, activities)
    return newActivity
  }

  static actualizar(id: string, changes: Partial<ActividadData>): Actividad | null {
    const activities = Actividad.obtenerTodas()
    const index = activities.findIndex(activity => activity.id === id)
    if (index === -1) return null

    const updatedActivity = new Actividad({ ...activities[index], ...changes })
    activities[index] = updatedActivity
    setItem(KEYS.activities, activities)
    return updatedActivity
  }

  static eliminar(id: string): void {
    const activities = Actividad.obtenerTodas().filter(activity => activity.id !== id)
    setItem(KEYS.activities, activities)
  }
}
