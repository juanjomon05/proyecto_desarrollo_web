// src/services/dailyLogService.ts
// CRUD de DailyLog. Ninguna view debe llamar
// a storage.ts directamente, siempre pasa por aqui.

import { DailyLog } from '@/models/DailyLog'
import type { DailyLogRecord } from '@/models/types'

export function getAllDailyLogs(): DailyLog[] {
  return DailyLog.getAll()
}

export function getDailyLogsByUser(userId: string): DailyLog[] {
  return DailyLog.getByUser(userId)
}

export function createDailyLog({ userId, date, studyHours, sleepHours }: Omit<DailyLogRecord, 'id'>): DailyLog {
  return DailyLog.create({ userId, date, studyHours, sleepHours })
}

export function updateDailyLog(id: string, changes: Partial<DailyLogRecord>): DailyLog | null {
  return DailyLog.update(id, changes)
}

export function deleteDailyLog(id: string): void {
  DailyLog.delete(id)
}
