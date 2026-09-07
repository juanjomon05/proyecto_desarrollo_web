// src/services/performanceService.ts
// Logica de analisis: cruza DailyLog (estudio/sueno) con Activity (notas).
// No es un CRUD, es la funcionalidad diferenciadora del proyecto.

import { Activity } from '@/models/Activity'
import { DailyLog } from '@/models/DailyLog'
import type { PerformanceData } from '@/models/types'

interface Averages {
  avgStudyHours: number | null
  avgSleepHours: number | null
}

function calculateAverages(logs: DailyLog[], endDate: string, days: number): Averages {
  const end = new Date(endDate)
  const start = new Date(end)
  start.setDate(start.getDate() - (days - 1))

  const inRange = logs.filter(log => {
    const date = new Date(log.date)
    return date >= start && date <= end
  })

  if (inRange.length === 0) {
    return { avgStudyHours: null, avgSleepHours: null }
  }

  const avgStudyHours = inRange.reduce((sum, log) => sum + log.studyHours, 0) / inRange.length
  const avgSleepHours = inRange.reduce((sum, log) => sum + log.sleepHours, 0) / inRange.length
  return { avgStudyHours, avgSleepHours }
}

export function getPerformanceData(userId: string, daysWindow = 3): PerformanceData[] {
  const logs = DailyLog.getByUser(userId)
  const gradedActivities = Activity.getAll().filter(activity => activity.grade !== null)

  return gradedActivities.map(activity => {
    const { avgStudyHours, avgSleepHours } = calculateAverages(logs, activity.dueDate, daysWindow)

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
