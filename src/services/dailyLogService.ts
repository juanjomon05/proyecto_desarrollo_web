import { useDailyLogStore } from '@/stores/dailyLogStore'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'
import type { CreateDailyLogDTO } from '@/dtos/CreateDailyLogDTO'
import type { UpdateDailyLogDTO } from '@/dtos/UpdateDailyLogDTO'

function normalizeLog(log: DailyLogInterface): DailyLogInterface {
  return {
    ...log,
    studyHours: Number(log.studyHours),
    sleepHours: Number(log.sleepHours)
  }
}

export class DailyLogService {
  static getDailyLogs(): DailyLogInterface[] {
    return useDailyLogStore().dailyLogs.map(normalizeLog)
  }

  static getDailyLogsByUser(userId: string): DailyLogInterface[] {
    return this.getDailyLogs().filter(log => log.userId === userId)
  }

  static createDailyLog({ userId, date, studyHours, sleepHours }: CreateDailyLogDTO): DailyLogInterface {
    const log: DailyLogInterface = {
      id: crypto.randomUUID(),
      userId,
      date,
      studyHours: Number(studyHours),
      sleepHours: Number(sleepHours)
    }

    useDailyLogStore().dailyLogs.push(log)
    return log
  }

  static updateDailyLog(id: string, changes: UpdateDailyLogDTO): DailyLogInterface | null {
    const store = useDailyLogStore()
    const index = store.dailyLogs.findIndex(log => log.id === id)
    if (index === -1) return null

    const updatedLog = normalizeLog({
      ...store.dailyLogs[index],
      ...changes
    })

    store.dailyLogs[index] = updatedLog
    return updatedLog
  }

  static deleteDailyLog(id: string): void {
    const store = useDailyLogStore()
    store.dailyLogs = store.dailyLogs.filter(log => log.id !== id)
  }
}

export function getAllDailyLogs(): DailyLogInterface[] {
  return DailyLogService.getDailyLogs()
}

export function getDailyLogsByUser(userId: string): DailyLogInterface[] {
  return DailyLogService.getDailyLogsByUser(userId)
}

export function createDailyLog(data: CreateDailyLogDTO): DailyLogInterface {
  return DailyLogService.createDailyLog(data)
}

export function updateDailyLog(id: string, changes: UpdateDailyLogDTO): DailyLogInterface | null {
  return DailyLogService.updateDailyLog(id, changes)
}

export function deleteDailyLog(id: string): void {
  DailyLogService.deleteDailyLog(id)
}
