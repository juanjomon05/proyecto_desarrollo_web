// internal imports
import { DailyLogsService } from '../daily-logs/daily-logs.service.js';

export async function seedDailyLogs(
  dailyLogsService: DailyLogsService,
  userId: number,
) {
  await dailyLogsService.create({
    userId,
    date: '2026-09-01',
    studyHours: 3,
    sleepHours: 7,
  });

  await dailyLogsService.create({
    userId,
    date: '2026-09-02',
    studyHours: 1.5,
    sleepHours: 5,
  });

  await dailyLogsService.create({
    userId,
    date: '2026-09-03',
    studyHours: 4,
    sleepHours: 8,
  });
}
