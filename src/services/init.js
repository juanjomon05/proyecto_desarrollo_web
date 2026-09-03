// src/services/init.js
// Se ejecuta una sola vez al arrancar la app (ver App.vue en el siguiente paso).
// Si localStorage ya tiene datos, no los toca. Si esta vacio, siembra los datos ficticios.

import { getItem, setItem } from './storage'
import { seedUsers, seedSubjects, seedActivities, seedDailyLogs } from './seedData'

const KEYS = {
  users: 'studeasy_users',
  subjects: 'studeasy_subjects',
  activities: 'studeasy_activities',
  dailyLogs: 'studeasy_dailyLogs'
}

export function initStorage() {
  if (getItem(KEYS.users) === null) {
    setItem(KEYS.users, seedUsers)
  }
  if (getItem(KEYS.subjects) === null) {
    setItem(KEYS.subjects, seedSubjects)
  }
  if (getItem(KEYS.activities) === null) {
    setItem(KEYS.activities, seedActivities)
  }
  if (getItem(KEYS.dailyLogs) === null) {
    setItem(KEYS.dailyLogs, seedDailyLogs)
  }
}

export { KEYS }