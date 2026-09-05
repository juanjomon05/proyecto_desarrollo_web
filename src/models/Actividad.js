import { getItem, setItem } from '../services/storage.js'
import { KEYS } from '../services/storageKeys.js'

export class Actividad {
  constructor({
    id = crypto.randomUUID(),
    subjectId,
    title,
    type,
    dueDate,
    status = 'pendiente',
    grade = null
  }) {
    this.id = id
    this.subjectId = subjectId
    this.title = title
    this.type = type
    this.dueDate = dueDate
    this.status = status
    this.grade = grade === '' ? null : grade
  }

  static from(data) {
    return data ? new Actividad(data) : null
  }

  static obtenerTodas() {
    return (getItem(KEYS.activities) || []).map(activity => Actividad.from(activity))
  }

  static obtenerPorMateria(subjectId) {
    return Actividad.obtenerTodas().filter(activity => activity.subjectId === subjectId)
  }

  static obtenerPorId(id) {
    return Actividad.obtenerTodas().find(activity => activity.id === id) || null
  }

  static crear({ subjectId, title, type, dueDate }) {
    const activities = Actividad.obtenerTodas()
    const newActivity = new Actividad({ subjectId, title, type, dueDate })
    activities.push(newActivity)
    setItem(KEYS.activities, activities)
    return newActivity
  }

  static actualizar(id, changes) {
    const activities = Actividad.obtenerTodas()
    const index = activities.findIndex(activity => activity.id === id)
    if (index === -1) return null

    const updatedActivity = new Actividad({ ...activities[index], ...changes })
    activities[index] = updatedActivity
    setItem(KEYS.activities, activities)
    return updatedActivity
  }

  static eliminar(id) {
    const activities = Actividad.obtenerTodas().filter(activity => activity.id !== id)
    setItem(KEYS.activities, activities)
  }
}
