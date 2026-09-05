// src/services/dailyLogService.js
// CRUD de RegistroDiario. Ninguna view debe llamar
// a storage.js directamente, siempre pasa por aqui.

import { RegistroDiario } from '@/models/RegistroDiario'

export function getAllDailyLogs() {
  return RegistroDiario.obtenerTodos()
}

export function getDailyLogsByUser(userId) {
  return RegistroDiario.obtenerPorUsuario(userId)
}

export function createDailyLog({ userId, date, studyHours, sleepHours }) {
  return RegistroDiario.crear({ userId, date, studyHours, sleepHours })
}

export function updateDailyLog(id, changes) {
  return RegistroDiario.actualizar(id, changes)
}

export function deleteDailyLog(id) {
  RegistroDiario.eliminar(id)
}
