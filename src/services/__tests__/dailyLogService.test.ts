// external imports
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// internal imports
import { DailyLogService } from '@/services/dailyLogService'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('DailyLogService', () => {
  it('crea un registro diario con las horas convertidas a numero', () => {
    const log = DailyLogService.createDailyLog({
      userId: 'u1',
      date: '2026-09-01',
      studyHours: '3' as unknown as number,
      sleepHours: '7' as unknown as number
    })

    expect(log.id).toBeTruthy()
    expect(log.studyHours).toBe(3)
    expect(log.sleepHours).toBe(7)
  })

  it('lista todos los registros', () => {
    DailyLogService.createDailyLog({ userId: 'u1', date: '2026-09-01', studyHours: 3, sleepHours: 7 })
    DailyLogService.createDailyLog({ userId: 'u1', date: '2026-09-02', studyHours: 2, sleepHours: 6 })

    expect(DailyLogService.getDailyLogs()).toHaveLength(2)
  })

  it('getDailyLogsByUser solo trae los registros de ese usuario', () => {
    DailyLogService.createDailyLog({ userId: 'u1', date: '2026-09-01', studyHours: 3, sleepHours: 7 })
    DailyLogService.createDailyLog({ userId: 'u2', date: '2026-09-01', studyHours: 5, sleepHours: 8 })

    const anaLogs = DailyLogService.getDailyLogsByUser('u1')

    expect(anaLogs).toHaveLength(1)
    expect(anaLogs[0].userId).toBe('u1')
  })

  it('updateDailyLog actualiza los campos y devuelve null si el id no existe', () => {
    const log = DailyLogService.createDailyLog({ userId: 'u1', date: '2026-09-01', studyHours: 3, sleepHours: 7 })

    const updated = DailyLogService.updateDailyLog(log.id, { studyHours: 4 })

    expect(updated?.studyHours).toBe(4)
    expect(DailyLogService.updateDailyLog('no-existe', { studyHours: 1 })).toBeNull()
  })

  it('deleteDailyLog elimina el registro', () => {
    const log = DailyLogService.createDailyLog({ userId: 'u1', date: '2026-09-01', studyHours: 3, sleepHours: 7 })

    DailyLogService.deleteDailyLog(log.id)

    expect(DailyLogService.getDailyLogs()).toHaveLength(0)
  })
})
