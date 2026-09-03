// src/services/activityService.js
// CRUD de Activity (Actividad). Ninguna view debe llamar a storage.js directamente,
// siempre pasa por aqui.

import { getItem, setItem } from './storage'
import { KEYS } from './init'

export function getAllActivities() {
  return getItem(KEYS.activities) || []
}

export function getActivitiesBySubject(subjectId) {
  return getAllActivities().filter(activity => activity.subjectId === subjectId)
}

export function getActivityById(id) {
  return getAllActivities().find(activity => activity.id === id) || null
}

export function createActivity({ subjectId, title, type, dueDate }) {
  const activities = getAllActivities()
  const newActivity = {
    id: crypto.randomUUID(),
    subjectId,
    title,
    type,
    dueDate,
    status: 'pendiente',
    grade: null
  }
  activities.push(newActivity)
  setItem(KEYS.activities, activities)
  return newActivity
}

export function updateActivity(id, changes) {
  const activities = getAllActivities()
  const index = activities.findIndex(activity => activity.id === id)
  if (index === -1) return null

  activities[index] = { ...activities[index], ...changes }
  setItem(KEYS.activities, activities)
  return activities[index]
}

export function deleteActivity(id) {
  const activities = getAllActivities().filter(activity => activity.id !== id)
  setItem(KEYS.activities, activities)
}