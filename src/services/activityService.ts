import { useActivityStore } from '@/stores/activityStore'
import { SubjectService } from '@/services/subjectService'
import type { ActivityInterface } from '@/interfaces/ActivityInterface'
import type { CreateActivityDTO } from '@/dtos/CreateActivityDTO'
import type { UpdateActivityDTO } from '@/dtos/UpdateActivityDTO'

function normalizeActivity(activity: ActivityInterface): ActivityInterface {
  return {
    ...activity,
    status: activity.status || 'pendiente',
    grade: activity.grade === null || activity.grade === undefined ? null : Number(activity.grade),
    weight: activity.weight === null || activity.weight === undefined ? null : Number(activity.weight)
  }
}

export class ActivityService {
  static getActivities(): ActivityInterface[] {
    return useActivityStore().activities.map(normalizeActivity)
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

  static getActivitySubjectId(id: string): string {
    return this.getActivityById(id)?.subjectId || ''
  }

  static createActivity({ subjectId, title, type, dueDate, weight }: CreateActivityDTO): ActivityInterface {
    const activity: ActivityInterface = {
      id: crypto.randomUUID(),
      subjectId,
      title,
      type,
      dueDate,
      status: 'pendiente',
      grade: null,
      weight: weight === null || weight === undefined ? null : Number(weight)
    }

    useActivityStore().activities.push(activity)
    return activity
  }

  static updateActivity(id: string, changes: UpdateActivityDTO): ActivityInterface | null {
    const store = useActivityStore()
    const index = store.activities.findIndex(activity => activity.id === id)
    if (index === -1) return null

    const updatedActivity = normalizeActivity({
      ...store.activities[index],
      ...changes
    })

    store.activities[index] = updatedActivity
    return updatedActivity
  }

  static deleteActivity(id: string): void {
    const store = useActivityStore()
    store.activities = store.activities.filter(activity => activity.id !== id)
  }
}
