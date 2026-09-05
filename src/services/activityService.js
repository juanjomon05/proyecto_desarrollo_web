// src/services/activityService.js
// CRUD de Actividad. Ninguna view debe llamar a storage.js directamente,
// siempre pasa por aqui.

import { Actividad } from '@/models/Actividad'

export function getAllActivities() {
  return Actividad.obtenerTodas()
}

export function getActivitiesBySubject(subjectId) {
  return Actividad.obtenerPorMateria(subjectId)
}

export function getActivityById(id) {
  return Actividad.obtenerPorId(id)
}

export function createActivity({ subjectId, title, type, dueDate }) {
  return Actividad.crear({ subjectId, title, type, dueDate })
}

export function updateActivity(id, changes) {
  return Actividad.actualizar(id, changes)
}

export function deleteActivity(id) {
  Actividad.eliminar(id)
}
