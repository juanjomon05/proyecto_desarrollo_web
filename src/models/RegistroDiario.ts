import { getItem, setItem } from '../services/storage'
import { KEYS } from '../services/storageKeys'
import type { RegistroDiarioData } from './types'

export class RegistroDiario {
  id: string
  userId: string
  date: string
  studyHours: number
  sleepHours: number

  constructor({ id = crypto.randomUUID(), userId, date, studyHours, sleepHours }: RegistroDiarioData) {
    this.id = id
    this.userId = userId
    this.date = date
    this.studyHours = Number(studyHours)
    this.sleepHours = Number(sleepHours)
  }

  static from(data: RegistroDiarioData | null | undefined): RegistroDiario | null {
    return data ? new RegistroDiario(data) : null
  }

  static obtenerTodos(): RegistroDiario[] {
    return (getItem<RegistroDiarioData[]>(KEYS.dailyLogs) || []).map(log => RegistroDiario.from(log) as RegistroDiario)
  }

  static obtenerPorUsuario(userId: string): RegistroDiario[] {
    return RegistroDiario.obtenerTodos().filter(log => log.userId === userId)
  }

  static crear({ userId, date, studyHours, sleepHours }: Omit<RegistroDiarioData, 'id'>): RegistroDiario {
    const logs = RegistroDiario.obtenerTodos()
    const newLog = new RegistroDiario({ userId, date, studyHours, sleepHours })
    logs.push(newLog)
    setItem(KEYS.dailyLogs, logs)
    return newLog
  }

  static actualizar(id: string, changes: Partial<RegistroDiarioData>): RegistroDiario | null {
    const logs = RegistroDiario.obtenerTodos()
    const index = logs.findIndex(log => log.id === id)
    if (index === -1) return null

    const updatedLog = new RegistroDiario({ ...logs[index], ...changes })
    logs[index] = updatedLog
    setItem(KEYS.dailyLogs, logs)
    return updatedLog
  }

  static eliminar(id: string): void {
    const logs = RegistroDiario.obtenerTodos().filter(log => log.id !== id)
    setItem(KEYS.dailyLogs, logs)
  }
}
