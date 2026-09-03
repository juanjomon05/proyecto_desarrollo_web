// src/services/dailyLogService.js
// CRUD de DailyLog (Registro diario de estudio/sueno). Ninguna view debe llamar
// a storage.js directamente, siempre pasa por aqui.

import { getItem, setItem } from './storage'
import { KEYS } from './init'

export function getAllDailyLogs() {
  return getItem(KEYS.dailyLogs) || []
}

export function getDailyLogsByUser(userId) {
  return getAllDailyLogs().filter(log => log.userId === userId)
}

export function createDailyLog({ userId, date, studyHours, sleepHours }) {
  const logs = getAllDailyLogs()
  const newLog = {
    id: crypto.randomUUID(),
    userId,
    date,
    studyHours,
    sleepHours
  }
  logs.push(newLog)
  setItem(KEYS.dailyLogs, logs)
  return newLog
}

export function updateDailyLog(id, changes) {
  const logs = getAllDailyLogs()
  const index = logs.findIndex(log => log.id === id)
  if (index === -1) return null

  logs[index] = { ...logs[index], ...changes }
  setItem(KEYS.dailyLogs, logs)
  return logs[index]
}

export function deleteDailyLog(id) {
  const logs = getAllDailyLogs().filter(log => log.id !== id)
  setItem(KEYS.dailyLogs, logs)
}