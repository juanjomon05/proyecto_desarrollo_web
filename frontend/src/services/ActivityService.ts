// external imports
import axios from 'axios'

// internal imports
import type { ActivityInterface } from '@/interfaces/ActivityInterface'
import type { CreateActivityDTO } from '@/dtos/CreateActivityDTO'
import type { UpdateActivityDTO } from '@/dtos/UpdateActivityDTO'

export class ActivityService {
  private static readonly API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/activities`

  static async getActivities(): Promise<ActivityInterface[]> {
    const { data } = await axios.get<ActivityInterface[]>(this.API_URL)
    return data
  }

  static async getActivitiesForUser(userId: number): Promise<ActivityInterface[]> {
    const { data } = await axios.get<ActivityInterface[]>(`${this.API_URL}/user/${userId}`)
    return data
  }

  static async getActivitiesBySubject(subjectId: number): Promise<ActivityInterface[]> {
    const { data } = await axios.get<ActivityInterface[]>(`${this.API_URL}/subject/${subjectId}`)
    return data
  }

  static async getActivityById(id: number): Promise<ActivityInterface | null> {
    const { data } = await axios.get<ActivityInterface | null>(`${this.API_URL}/${id}`)
    return data || null
  }

  static async createActivity(activity: CreateActivityDTO): Promise<ActivityInterface> {
    const { data } = await axios.post<ActivityInterface>(this.API_URL, activity)
    return data
  }

  static async updateActivity(id: number, changes: UpdateActivityDTO): Promise<ActivityInterface | null> {
    const { data } = await axios.patch<ActivityInterface | null>(`${this.API_URL}/${id}`, changes)
    return data || null
  }

  static async deleteActivity(id: number): Promise<void> {
    await axios.delete(`${this.API_URL}/${id}`)
  }
}
