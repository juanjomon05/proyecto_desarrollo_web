// external imports
import axios from 'axios'

// internal imports
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'
import type { CreateDailyLogDTO } from '@/dtos/CreateDailyLogDTO'
import type { UpdateDailyLogDTO } from '@/dtos/UpdateDailyLogDTO'

export class DailyLogService {
  private static readonly API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/daily-logs`

  static async getDailyLogs(): Promise<DailyLogInterface[]> {
    const { data } = await axios.get<DailyLogInterface[]>(this.API_URL)
    return data
  }

  static async getDailyLogsByUser(userId: number): Promise<DailyLogInterface[]> {
    const { data } = await axios.get<DailyLogInterface[]>(`${this.API_URL}/user/${userId}`)
    return data
  }

  static async createDailyLog(log: CreateDailyLogDTO): Promise<DailyLogInterface> {
    const { data } = await axios.post<DailyLogInterface>(this.API_URL, log)
    return data
  }

  static async updateDailyLog(id: number, changes: UpdateDailyLogDTO): Promise<DailyLogInterface | null> {
    const { data } = await axios.patch<DailyLogInterface | null>(`${this.API_URL}/${id}`, changes)
    return data || null
  }

  static async deleteDailyLog(id: number): Promise<void> {
    await axios.delete(`${this.API_URL}/${id}`)
  }
}
