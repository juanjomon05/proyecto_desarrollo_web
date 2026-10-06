// external imports
import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'

// internal imports
import { SubjectService } from '@/services/SubjectService'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'

vi.mock('axios')

const subject: SubjectInterface = { id: 1, userId: 1, name: 'Cálculo III', professor: 'Ing. Vargas', credits: 4 }

beforeEach(() => {
  vi.resetAllMocks()
})

describe('SubjectService', () => {
  it('getSubjects consulta /api/subjects', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [subject] })

    expect(await SubjectService.getSubjects()).toEqual([subject])
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/api\/subjects$/))
  })

  it('getSubjectsByUser consulta las materias del usuario', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [subject] })

    await SubjectService.getSubjectsByUser(1)

    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/api\/subjects\/user\/1$/))
  })

  it('getSubjectById devuelve la materia y null si no existe', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: subject })
    expect((await SubjectService.getSubjectById(1))?.name).toBe('Cálculo III')

    vi.mocked(axios.get).mockResolvedValue({ data: '' })
    expect(await SubjectService.getSubjectById(999)).toBeNull()
  })

  it('createSubject envia la materia al backend', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: subject })
    const newSubject = { name: 'Cálculo III', professor: 'Ing. Vargas', credits: 4, userId: 1 }

    expect(await SubjectService.createSubject(newSubject)).toEqual(subject)
    expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/api\/subjects$/), newSubject)
  })

  it('updateSubject envia los cambios y devuelve null si el id no existe', async () => {
    vi.mocked(axios.patch).mockResolvedValue({ data: { ...subject, credits: 5 } })

    expect((await SubjectService.updateSubject(1, { credits: 5 }))?.credits).toBe(5)
    expect(axios.patch).toHaveBeenCalledWith(expect.stringMatching(/\/api\/subjects\/1$/), { credits: 5 })

    vi.mocked(axios.patch).mockResolvedValue({ data: '' })
    expect(await SubjectService.updateSubject(999, { credits: 1 })).toBeNull()
  })

  it('deleteSubject llama a DELETE /api/subjects/:id', async () => {
    vi.mocked(axios.delete).mockResolvedValue({ data: '' })

    await SubjectService.deleteSubject(1)

    expect(axios.delete).toHaveBeenCalledWith(expect.stringMatching(/\/api\/subjects\/1$/))
  })
})
