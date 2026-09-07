// src/services/activityService.ts
// CRUD de Activity. Ninguna view debe llamar a storage.ts directamente,
// siempre pasa por aqui.

import { Activity } from '@/models/Activity'
import type { ActivityRecord } from '@/models/types'

export function getAllActivities(): Activity[] {
  return Activity.getAll()
}

export function getActivitiesBySubject(subjectId: string): Activity[] {
  return Activity.getBySubject(subjectId)
}

export function getActivityById(id: string): Activity | null {
  return Activity.getById(id)
}

export function getActivitySubjectId(id: string): string {
  return Activity.getSubjectId(id)
}

export function createActivity({ subjectId, title, type, dueDate }: Pick<ActivityRecord, 'subjectId' | 'title' | 'type' | 'dueDate'>): Activity {
  return Activity.create({ subjectId, title, type, dueDate })
}

export function updateActivity(id: string, changes: Partial<ActivityRecord>): Activity | null {
  return Activity.update(id, changes)
}

export function deleteActivity(id: string): void {
  Activity.delete(id)
}
