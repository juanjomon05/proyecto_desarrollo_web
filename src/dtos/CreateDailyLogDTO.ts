import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'

export type CreateDailyLogDTO = Omit<DailyLogInterface, 'id'>
