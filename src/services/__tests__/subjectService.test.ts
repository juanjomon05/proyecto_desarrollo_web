// external imports
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// internal imports
import { SubjectService } from '@/services/subjectService'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('SubjectService', () => {
  it('crea una materia y le asigna un id', () => {
    const subject = SubjectService.createSubject({
      name: 'Cálculo III',
      professor: 'Ing. Vargas',
      credits: 4,
      userId: 'u1'
    })

    expect(subject.id).toBeTruthy()
    expect(subject.name).toBe('Cálculo III')
    expect(subject.credits).toBe(4)
  })

  it('lista todas las materias creadas', () => {
    SubjectService.createSubject({ name: 'Materia A', professor: 'Prof A', credits: 3, userId: 'u1' })
    SubjectService.createSubject({ name: 'Materia B', professor: 'Prof B', credits: 2, userId: 'u2' })

    expect(SubjectService.getSubjects()).toHaveLength(2)
  })

  it('getSubjectsByUser solo devuelve las materias de ese usuario, sin mezclar otras cuentas', () => {
    SubjectService.createSubject({ name: 'De Ana', professor: 'Prof A', credits: 3, userId: 'u1' })
    SubjectService.createSubject({ name: 'De Otro', professor: 'Prof B', credits: 2, userId: 'u2' })
    SubjectService.createSubject({ name: 'Sin dueño (admin)', professor: 'Prof C', credits: 1 })

    const anaSubjects = SubjectService.getSubjectsByUser('u1')

    expect(anaSubjects).toHaveLength(1)
    expect(anaSubjects[0].name).toBe('De Ana')
  })

  it('getSubjectById encuentra la materia correcta y null si no existe', () => {
    const created = SubjectService.createSubject({ name: 'Física', professor: 'Prof X', credits: 3, userId: 'u1' })

    expect(SubjectService.getSubjectById(created.id)?.name).toBe('Física')
    expect(SubjectService.getSubjectById('no-existe')).toBeNull()
  })

  it('updateSubject actualiza los campos y devuelve null si el id no existe', () => {
    const created = SubjectService.createSubject({ name: 'Química', professor: 'Prof Y', credits: 3, userId: 'u1' })

    const updated = SubjectService.updateSubject(created.id, { credits: 5 })

    expect(updated?.credits).toBe(5)
    expect(updated?.name).toBe('Química')
    expect(SubjectService.updateSubject('no-existe', { credits: 1 })).toBeNull()
  })

  it('deleteSubject elimina la materia', () => {
    const created = SubjectService.createSubject({ name: 'Borrar', professor: 'Prof Z', credits: 3, userId: 'u1' })

    SubjectService.deleteSubject(created.id)

    expect(SubjectService.getSubjectById(created.id)).toBeNull()
    expect(SubjectService.getSubjects()).toHaveLength(0)
  })
})
