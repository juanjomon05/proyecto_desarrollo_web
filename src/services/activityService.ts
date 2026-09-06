// src/services/activityService.ts
// CRUD de Actividad. Ninguna view debe llamar a storage.ts directamente,
// siempre pasa por aqui.

import { Actividad } from '@/models/Actividad'
import type { ActividadData } from '@/models/types'

export function getAllActivities(): Actividad[] {
  return Actividad.obtenerTodas()
}

export function getActivitiesBySubject(subjectId: string): Actividad[] {
  return Actividad.obtenerPorMateria(subjectId)
}

export function getActivityById(id: string): Actividad | null {
  return Actividad.obtenerPorId(id)
}

export function createActivity({ subjectId, title, type, dueDate }: Pick<ActividadData, 'subjectId' | 'title' | 'type' | 'dueDate'>): Actividad {
  return Actividad.crear({ subjectId, title, type, dueDate })
}

export function updateActivity(id: string, changes: Partial<ActividadData>): Actividad | null {
  return Actividad.actualizar(id, changes)
}

export function deleteActivity(id: string): void {
  Actividad.eliminar(id)
}
