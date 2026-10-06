// internal imports
import { useDailyLogStore } from '@/stores/DailyLogStore'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'
import type { CreateDailyLogDTO } from '@/dtos/CreateDailyLogDTO'
import type { UpdateDailyLogDTO } from '@/dtos/UpdateDailyLogDTO'

export class DailyLogService {
  static getDailyLogs(): DailyLogInterface[] {
    return useDailyLogStore().dailyLogs
  }

  static getDailyLogsByUser(userId: number): DailyLogInterface[] {
    return this.getDailyLogs().filter(log => log.userId === userId)
  }

  static createDailyLog(log: CreateDailyLogDTO): DailyLogInterface {
    const store = useDailyLogStore()
    const createdLog: DailyLogInterface = {
      id: Math.max(0, ...store.dailyLogs.map(item => item.id)) + 1,
      ...log
    }

    store.dailyLogs.push(createdLog)
    return createdLog
  }

  static updateDailyLog(id: number, changes: UpdateDailyLogDTO): DailyLogInterface | null {
    const store = useDailyLogStore()
    const index = store.dailyLogs.findIndex(log => log.id === id)
    if (index === -1) return null

    const updatedLog: DailyLogInterface = {
      ...store.dailyLogs[index],
      ...changes
    }

    store.dailyLogs[index] = updatedLog
    return updatedLog
  }

  static deleteDailyLog(id: number): void {
    const store = useDailyLogStore()
    store.dailyLogs = store.dailyLogs.filter(log => log.id !== id)
  }
}
