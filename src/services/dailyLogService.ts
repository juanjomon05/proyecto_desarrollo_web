// src/services/dailyLogService.ts
// CRUD de RegistroDiario. Ninguna view debe llamar
// a storage.ts directamente, siempre pasa por aqui.

import { RegistroDiario } from '@/models/RegistroDiario'
import type { RegistroDiarioData } from '@/models/types'

export function getAllDailyLogs(): RegistroDiario[] {
  return RegistroDiario.obtenerTodos()
}

export function getDailyLogsByUser(userId: string): RegistroDiario[] {
  return RegistroDiario.obtenerPorUsuario(userId)
}

export function createDailyLog({ userId, date, studyHours, sleepHours }: Omit<RegistroDiarioData, 'id'>): RegistroDiario {
  return RegistroDiario.crear({ userId, date, studyHours, sleepHours })
}

export function updateDailyLog(id: string, changes: Partial<RegistroDiarioData>): RegistroDiario | null {
  return RegistroDiario.actualizar(id, changes)
}

export function deleteDailyLog(id: string): void {
  RegistroDiario.eliminar(id)
}
