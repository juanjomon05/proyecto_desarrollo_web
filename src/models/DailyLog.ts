import { getItem, setItem } from '../services/storage'
import { KEYS } from '../services/storageKeys'
import type { DailyLogData, DailyLogRecord } from './types'

function getRecords(): DailyLogRecord[] {
  return (getItem<DailyLogRecord[]>(KEYS.dailyLogs) || []).map(log => ({
    ...log,
    studyHours: Number(log.studyHours),
    sleepHours: Number(log.sleepHours)
  }))
}

function saveRecords(logs: DailyLogRecord[]): void {
  setItem(KEYS.dailyLogs, logs)
}

export class DailyLog implements DailyLogData {
  id: string
  date: string
  studyHours: number
  sleepHours: number

  constructor({ id = crypto.randomUUID(), date, studyHours, sleepHours }: DailyLogData) {
    this.id = id
    this.date = date
    this.studyHours = Number(studyHours)
    this.sleepHours = Number(sleepHours)
  }

  CRUD(): string[] {
    return ['create', 'read', 'update', 'delete']
  }

  getters(): Required<DailyLogData> {
    return {
      id: this.id,
      date: this.date,
      studyHours: this.studyHours,
      sleepHours: this.sleepHours
    }
  }

  setters(changes: Partial<DailyLogData>): DailyLog {
    if (changes.id !== undefined) this.id = changes.id
    if (changes.date !== undefined) this.date = changes.date
    if (changes.studyHours !== undefined) this.studyHours = Number(changes.studyHours)
    if (changes.sleepHours !== undefined) this.sleepHours = Number(changes.sleepHours)
    return this
  }

  static from(data: DailyLogData | null | undefined): DailyLog | null {
    return data ? new DailyLog(data) : null
  }

  static getAll(): DailyLog[] {
    return getRecords().map(log => DailyLog.from(log) as DailyLog)
  }

  static getByUser(userId: string): DailyLog[] {
    return getRecords()
      .filter(log => log.userId === userId)
      .map(log => DailyLog.from(log) as DailyLog)
  }

  static create({ userId, date, studyHours, sleepHours }: Omit<DailyLogRecord, 'id'>): DailyLog {
    const logs = getRecords()
    const newLog = new DailyLog({ date, studyHours, sleepHours })
    logs.push({ ...newLog.getters(), userId })
    saveRecords(logs)
    return newLog
  }

  static update(id: string, changes: Partial<DailyLogRecord>): DailyLog | null {
    const logs = getRecords()
    const index = logs.findIndex(log => log.id === id)
    if (index === -1) return null

    const userId = changes.userId ?? logs[index].userId
    const updatedLog = new DailyLog({ ...logs[index], ...changes })
    logs[index] = { ...updatedLog.getters(), userId }
    saveRecords(logs)
    return updatedLog
  }

  static delete(id: string): void {
    const logs = getRecords().filter(log => log.id !== id)
    saveRecords(logs)
  }
}
