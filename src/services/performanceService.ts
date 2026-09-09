import { ActivityService } from '@/services/activityService'
import { DailyLogService } from '@/services/dailyLogService'
import { getTodayLocalDate } from '@/utils/format'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'
import type { PerformanceDataInterface } from '@/interfaces/PerformanceDataInterface'

interface Averages {
  avgStudyHours: number | null
  avgSleepHours: number | null
}

function calculateAverages(logs: DailyLogInterface[], endDate: string, days: number): Averages {
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

export class PerformanceService {
  static getPerformanceData(userId: string, daysWindow = 3): PerformanceDataInterface[] {
    const logs = DailyLogService.getDailyLogsByUser(userId)
    const gradedActivities = ActivityService.getActivitiesForUser(userId).filter(activity => activity.grade !== null)
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
}

export function getPerformanceData(userId: string, daysWindow = 3): PerformanceDataInterface[] {
  return PerformanceService.getPerformanceData(userId, daysWindow)
}
