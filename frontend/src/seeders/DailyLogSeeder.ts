// internal imports
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'

export const dailyLogSeeder: DailyLogInterface[] = [
  { id: 1, userId: 1, date: '2026-09-01', studyHours: 3, sleepHours: 7 },
  { id: 2, userId: 1, date: '2026-09-02', studyHours: 1.5, sleepHours: 5 },
  { id: 3, userId: 1, date: '2026-09-03', studyHours: 4, sleepHours: 8 }
]
