import { getItem, setItem } from '../services/storage.js'
import { KEYS } from '../services/storageKeys.js'

export class RegistroDiario {
  constructor({ id = crypto.randomUUID(), userId, date, studyHours, sleepHours }) {
    this.id = id
    this.userId = userId
    this.date = date
    this.studyHours = Number(studyHours)
    this.sleepHours = Number(sleepHours)
  }

  static from(data) {
    return data ? new RegistroDiario(data) : null
  }

  static obtenerTodos() {
    return (getItem(KEYS.dailyLogs) || []).map(log => RegistroDiario.from(log))
  }

  static obtenerPorUsuario(userId) {
    return RegistroDiario.obtenerTodos().filter(log => log.userId === userId)
  }

  static crear({ userId, date, studyHours, sleepHours }) {
    const logs = RegistroDiario.obtenerTodos()
    const newLog = new RegistroDiario({ userId, date, studyHours, sleepHours })
    logs.push(newLog)
    setItem(KEYS.dailyLogs, logs)
    return newLog
  }

  static actualizar(id, changes) {
    const logs = RegistroDiario.obtenerTodos()
    const index = logs.findIndex(log => log.id === id)
    if (index === -1) return null

    const updatedLog = new RegistroDiario({ ...logs[index], ...changes })
    logs[index] = updatedLog
    setItem(KEYS.dailyLogs, logs)
    return updatedLog
  }

  static eliminar(id) {
    const logs = RegistroDiario.obtenerTodos().filter(log => log.id !== id)
    setItem(KEYS.dailyLogs, logs)
  }
}
