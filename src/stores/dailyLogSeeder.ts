// internal imports
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'

export const dailyLogSeeder: DailyLogInterface[] = [
  { id: 'd1', userId: 'u1', date: '2026-09-01', studyHours: 3, sleepHours: 7 },
  { id: 'd2', userId: 'u1', date: '2026-09-02', studyHours: 1.5, sleepHours: 5 },
  { id: 'd3', userId: 'u1', date: '2026-09-03', studyHours: 4, sleepHours: 8 }
]
