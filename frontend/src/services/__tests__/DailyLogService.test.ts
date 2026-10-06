// external imports
import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'

// internal imports
import { DailyLogService } from '@/services/DailyLogService'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'

vi.mock('axios')

const log: DailyLogInterface = { id: 1, userId: 1, date: '2026-09-01', studyHours: 3, sleepHours: 7 }

beforeEach(() => {
  vi.resetAllMocks()
})

describe('DailyLogService', () => {
  it('getDailyLogs consulta /api/daily-logs', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [log] })

    expect(await DailyLogService.getDailyLogs()).toEqual([log])
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/api\/daily-logs$/))
  })

  it('getDailyLogsByUser consulta los registros del usuario', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [log] })

    await DailyLogService.getDailyLogsByUser(1)

    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/api\/daily-logs\/user\/1$/))
  })

  it('createDailyLog envia el registro al backend', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: log })
    const newLog = { userId: 1, date: '2026-09-01', studyHours: 3, sleepHours: 7 }

    expect(await DailyLogService.createDailyLog(newLog)).toEqual(log)
    expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/api\/daily-logs$/), newLog)
  })

  it('updateDailyLog envia los cambios y devuelve null si el id no existe', async () => {
    vi.mocked(axios.patch).mockResolvedValue({ data: { ...log, studyHours: 4 } })

    expect((await DailyLogService.updateDailyLog(1, { studyHours: 4 }))?.studyHours).toBe(4)
    expect(axios.patch).toHaveBeenCalledWith(expect.stringMatching(/\/api\/daily-logs\/1$/), { studyHours: 4 })

    vi.mocked(axios.patch).mockResolvedValue({ data: '' })
    expect(await DailyLogService.updateDailyLog(999, { studyHours: 1 })).toBeNull()
  })

  it('deleteDailyLog llama a DELETE /api/daily-logs/:id', async () => {
    vi.mocked(axios.delete).mockResolvedValue({ data: '' })

    await DailyLogService.deleteDailyLog(1)

    expect(axios.delete).toHaveBeenCalledWith(expect.stringMatching(/\/api\/daily-logs\/1$/))
  })
})
