// src/services/performanceService.js
// Logica de analisis: cruza DailyLog (estudio/sueno) con Activity (notas).
// No es un CRUD, es la funcionalidad diferenciadora del proyecto.

import { getAllActivities } from './activityService'
import { getDailyLogsByUser } from './dailyLogService'

function averageHoursInRange(logs, endDate, days) {
  const end = new Date(endDate)
  const start = new Date(end)
  start.setDate(start.getDate() - (days - 1))

  const inRange = logs.filter(log => {
    const d = new Date(log.date)
    return d >= start && d <= end
  })

  if (inRange.length === 0) {
    return { avgStudyHours: null, avgSleepHours: null }
  }

  const avgStudyHours = inRange.reduce((sum, l) => sum + l.studyHours, 0) / inRange.length
  const avgSleepHours = inRange.reduce((sum, l) => sum + l.sleepHours, 0) / inRange.length
  return { avgStudyHours, avgSleepHours }
}

export function getPerformanceData(userId, daysWindow = 3) {
  const logs = getDailyLogsByUser(userId)
  const gradedActivities = getAllActivities().filter(activity => activity.grade !== null)

  return gradedActivities.map(activity => {
    const { avgStudyHours, avgSleepHours } = averageHoursInRange(logs, activity.dueDate, daysWindow)
    return {
      activityId: activity.id,
      activityTitle: activity.title,
      dueDate: activity.dueDate,
      grade: activity.grade,
      avgStudyHours,
      avgSleepHours
    }
  })
}