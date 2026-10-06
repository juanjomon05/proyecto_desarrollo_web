// internal imports
import { DateUtils } from '@/utils/DateUtils'
import type { ActivityInterface } from '@/interfaces/ActivityInterface'
import type { AveragesInterface } from '@/interfaces/AveragesInterface'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'
import type { PerformanceDataInterface } from '@/interfaces/PerformanceDataInterface'

export class PerformanceCalculator {
  static getPerformanceData(
    logs: DailyLogInterface[],
    activities: ActivityInterface[],
    daysWindow = 3
  ): PerformanceDataInterface[] {
    const gradedActivities = activities.filter(activity => activity.grade !== null)
    const today = DateUtils.getTodayLocalDate()
    const { avgStudyHours, avgSleepHours } = this.calculateAverages(logs, today, daysWindow)

    return gradedActivities.map(activity => ({
      activityId: activity.id,
      activityTitle: activity.title,
      dueDate: activity.dueDate,
      grade: activity.grade,
      avgStudyHours,
      avgSleepHours
    }))
  }

  // private helpers
  private static calculateAverages(logs: DailyLogInterface[], endDate: string, days: number): AveragesInterface {
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
}
