// src/services/activityService.ts
// CRUD de Activity. Ninguna view debe llamar a storage.ts directamente,
// siempre pasa por aqui.

import { Activity } from '@/models/Activity'
import { getSubjectsByUser } from './subjectService'
import type { CreateActivityDTO, UpdateActivityDTO } from './dtos'

export function getAllActivities(): Activity[] {
  return Activity.getAll()
}

// Actividades de las materias del usuario (ver Subject.getByUser). A diferencia
// de getAllActivities(), no mezcla actividades de materias de otros usuarios.
export function getActivitiesForUser(userId: string): Activity[] {
  const visibleSubjectIds = new Set(getSubjectsByUser(userId).map(subject => subject.id))
  return Activity.getAll().filter(activity => visibleSubjectIds.has(Activity.getSubjectId(activity.id)))
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

export function createActivity({ subjectId, title, type, dueDate, weight }: CreateActivityDTO): Activity {
  return Activity.create({ subjectId, title, type, dueDate, weight })
}

export function updateActivity(id: string, changes: UpdateActivityDTO): Activity | null {
  return Activity.update(id, changes)
}

export function deleteActivity(id: string): void {
  Activity.delete(id)
}
