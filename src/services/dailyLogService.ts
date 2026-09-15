// internal imports
import { useDailyLogStore } from '@/stores/dailyLogStore'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'
import type { CreateDailyLogDTO } from '@/dtos/CreateDailyLogDTO'
import type { UpdateDailyLogDTO } from '@/dtos/UpdateDailyLogDTO'

export class DailyLogService {
  static getDailyLogs(): DailyLogInterface[] {
    return useDailyLogStore().dailyLogs.map(log => this.normalizeLog(log))
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

    const updatedLog = this.normalizeLog({
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

  // private helpers
  private static normalizeLog(log: DailyLogInterface): DailyLogInterface {
    return {
      ...log,
      studyHours: Number(log.studyHours),
      sleepHours: Number(log.sleepHours)
    }
  }
}
