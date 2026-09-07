// src/services/performanceService.ts
// Logica de analisis: cruza DailyLog (estudio/sueno) con Activity (notas).
// No es un CRUD, es la funcionalidad diferenciadora del proyecto.

import { DailyLog } from '@/models/DailyLog'
import { getActivitiesForUser } from './activityService'
import { getTodayLocalDate } from '@/utils/format'
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

// El promedio de estudio/sueno se calcula sobre los ultimos `daysWindow` dias
// contados desde HOY (no desde la fecha de vencimiento de cada actividad). Antes
// se anclaba a la dueDate de cada actividad, asi que un registro de habitos hecho
// "hoy" solo aparecia para las actividades cuya fecha de vencimiento coincidiera
// por casualidad con esos dias, dando resultados que parecian aleatorios y que no
// reaccionaban al registrar un nuevo dia ni al cambiar el selector.
export function getPerformanceData(userId: string, daysWindow = 3): PerformanceData[] {
  const logs = DailyLog.getByUser(userId)
  const gradedActivities = getActivitiesForUser(userId).filter(activity => activity.grade !== null)
  const today = getTodayLocalDate()
  const { avgStudyHours, avgSleepHours } = calculateAverages(logs, today, daysWindow)

  return gradedActivities.map(activity => ({
    activityId: activity.id,
    activityTitle: activity.title,
    dueDate: activity.dueDate,
    grade: activity.grade,
    avgStudyHours,
    avgSleepHours
  }))
}
