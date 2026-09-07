import { getItem, setItem } from '../services/storage'
import { KEYS } from '../services/storageKeys'
import type { ActivityData, ActivityRecord, ActivityStatus, ActivityType } from './types'

function normalizeActivity(activity: ActivityRecord): ActivityRecord {
  return {
    ...activity,
    status: activity.status || 'pendiente',
    grade: activity.grade === '' || activity.grade === null || activity.grade === undefined
      ? null
      : Number(activity.grade)
  }
}

function getRecords(): ActivityRecord[] {
  return (getItem<ActivityRecord[]>(KEYS.activities) || []).map(normalizeActivity)
}

function saveRecords(activities: ActivityRecord[]): void {
  setItem(KEYS.activities, activities)
}

export class Activity implements ActivityData {
  id: string
  title: string
  type: ActivityType
  dueDate: string
  status: ActivityStatus
  grade: number | null

  constructor({
    id = crypto.randomUUID(),
    title,
    type,
    dueDate,
    status = 'pendiente',
    grade = null
  }: ActivityData) {
    this.id = id
    this.title = title
    this.type = type
    this.dueDate = dueDate
    this.status = status
    this.grade = grade === '' || grade === null || grade === undefined ? null : Number(grade)
  }

  CRUD(): string[] {
    return ['create', 'read', 'update', 'delete']
  }

  getters(): Required<ActivityData> {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      dueDate: this.dueDate,
      status: this.status,
      grade: this.grade
    }
  }

  setters(changes: Partial<ActivityData>): Activity {
    if (changes.id !== undefined) this.id = changes.id
    if (changes.title !== undefined) this.title = changes.title
    if (changes.type !== undefined) this.type = changes.type
    if (changes.dueDate !== undefined) this.dueDate = changes.dueDate
    if (changes.status !== undefined) this.status = changes.status
    if (changes.grade !== undefined) {
      this.grade = changes.grade === '' || changes.grade === null ? null : Number(changes.grade)
    }
    return this
  }

  static from(data: ActivityData | null | undefined): Activity | null {
    return data ? new Activity(data) : null
  }

  static getAll(): Activity[] {
    return getRecords().map(activity => Activity.from(activity) as Activity)
  }

  static getBySubject(subjectId: string): Activity[] {
    return getRecords()
      .filter(activity => activity.subjectId === subjectId)
      .map(activity => Activity.from(activity) as Activity)
  }

  static getById(id: string): Activity | null {
    return Activity.getAll().find(activity => activity.id === id) || null
  }

  static getSubjectId(id: string): string {
    return getRecords().find(activity => activity.id === id)?.subjectId || ''
  }

  static create({ subjectId, title, type, dueDate }: Pick<ActivityRecord, 'subjectId' | 'title' | 'type' | 'dueDate'>): Activity {
    const activities = getRecords()
    const newActivity = new Activity({ title, type, dueDate })
    activities.push({ ...newActivity.getters(), subjectId })
    saveRecords(activities)
    return newActivity
  }

  static update(id: string, changes: Partial<ActivityRecord>): Activity | null {
    const activities = getRecords()
    const index = activities.findIndex(activity => activity.id === id)
    if (index === -1) return null

    const subjectId = changes.subjectId ?? activities[index].subjectId
    const updatedActivity = new Activity({ ...activities[index], ...changes })
    activities[index] = { ...updatedActivity.getters(), subjectId }
    saveRecords(activities)
    return updatedActivity
  }

  static delete(id: string): void {
    const activities = getRecords().filter(activity => activity.id !== id)
    saveRecords(activities)
  }
}
