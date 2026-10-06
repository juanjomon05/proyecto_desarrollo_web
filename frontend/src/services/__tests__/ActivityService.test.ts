// external imports
import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'

// internal imports
import { ActivityService } from '@/services/ActivityService'
import type { ActivityInterface } from '@/interfaces/ActivityInterface'

vi.mock('axios')

const activity: ActivityInterface = {
  id: 1,
  subjectId: 1,
  title: 'Quiz 1',
  type: 'quiz',
  dueDate: '2026-10-01',
  status: 'pendiente',
  grade: null,
  weight: 30
}

beforeEach(() => {
  vi.resetAllMocks()
})

describe('ActivityService', () => {
  it('getActivities consulta /api/activities', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [activity] })

    expect(await ActivityService.getActivities()).toEqual([activity])
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/api\/activities$/))
  })

  it('getActivitiesForUser consulta las actividades del usuario', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [activity] })

    await ActivityService.getActivitiesForUser(1)

    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/api\/activities\/user\/1$/))
  })

  it('getActivitiesBySubject consulta las actividades de la materia', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [activity] })

    await ActivityService.getActivitiesBySubject(1)

    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/api\/activities\/subject\/1$/))
  })

  it('getActivityById devuelve null cuando el backend no encuentra la actividad', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: '' })

    expect(await ActivityService.getActivityById(999)).toBeNull()
  })

  it('createActivity envia la actividad al backend', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: activity })
    const newActivity = { subjectId: 1, title: 'Quiz 1', type: 'quiz' as const, dueDate: '2026-10-01', weight: 30 }

    expect(await ActivityService.createActivity(newActivity)).toEqual(activity)
    expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/api\/activities$/), newActivity)
  })

  it('updateActivity envia los cambios y devuelve null si el id no existe', async () => {
    vi.mocked(axios.patch).mockResolvedValue({ data: { ...activity, status: 'completada', grade: 4.5 } })

    const graded = await ActivityService.updateActivity(1, { status: 'completada', grade: 4.5 })

    expect(graded?.grade).toBe(4.5)
    expect(axios.patch).toHaveBeenCalledWith(expect.stringMatching(/\/api\/activities\/1$/), { status: 'completada', grade: 4.5 })

    vi.mocked(axios.patch).mockResolvedValue({ data: '' })
    expect(await ActivityService.updateActivity(999, { grade: 5 })).toBeNull()
  })

  it('deleteActivity llama a DELETE /api/activities/:id', async () => {
    vi.mocked(axios.delete).mockResolvedValue({ data: '' })

    await ActivityService.deleteActivity(1)

    expect(axios.delete).toHaveBeenCalledWith(expect.stringMatching(/\/api\/activities\/1$/))
  })
})
