// internal imports
import { useActivityStore } from '@/stores/ActivityStore'
import { SubjectService } from '@/services/SubjectService'
import type { ActivityInterface } from '@/interfaces/ActivityInterface'
import type { CreateActivityDTO } from '@/dtos/CreateActivityDTO'
import type { UpdateActivityDTO } from '@/dtos/UpdateActivityDTO'

export class ActivityService {
  static getActivities(): ActivityInterface[] {
    return useActivityStore().activities
  }

  static getActivitiesForUser(userId: string): ActivityInterface[] {
    const subjectIds = new Set(SubjectService.getSubjectsByUser(userId).map(subject => subject.id))
    return this.getActivities().filter(activity => subjectIds.has(activity.subjectId))
  }

  static getActivitiesBySubject(subjectId: string): ActivityInterface[] {
    return this.getActivities().filter(activity => activity.subjectId === subjectId)
  }

  static getActivityById(id: string): ActivityInterface | null {
    return this.getActivities().find(activity => activity.id === id) || null
  }

  static createActivity(activity: CreateActivityDTO): ActivityInterface {
    const createdActivity: ActivityInterface = {
      id: crypto.randomUUID(),
      ...activity,
      status: 'pendiente',
      grade: null
    }

    useActivityStore().activities.push(createdActivity)
    return createdActivity
  }

  static updateActivity(id: string, changes: UpdateActivityDTO): ActivityInterface | null {
    const store = useActivityStore()
    const index = store.activities.findIndex(activity => activity.id === id)
    if (index === -1) return null

    const updatedActivity: ActivityInterface = {
      ...store.activities[index],
      ...changes
    }

    store.activities[index] = updatedActivity
    return updatedActivity
  }

  static deleteActivity(id: string): void {
    const store = useActivityStore()
    store.activities = store.activities.filter(activity => activity.id !== id)
  }
}
