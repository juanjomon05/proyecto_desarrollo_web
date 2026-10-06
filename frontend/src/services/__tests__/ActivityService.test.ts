// external imports
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// internal imports
import { ActivityService } from '@/services/ActivityService'
import { SubjectService } from '@/services/SubjectService'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('ActivityService', () => {
  it('crea una actividad pendiente y sin nota por defecto', () => {
    const subject = SubjectService.createSubject({ name: 'Materia', professor: 'Prof', credits: 3, userId: 1 })

    const activity = ActivityService.createActivity({
      subjectId: subject.id,
      title: 'Quiz 1',
      type: 'quiz',
      dueDate: '2026-10-01',
      weight: 30
    })

    expect(activity.id).toBeTruthy()
    expect(activity.status).toBe('pendiente')
    expect(activity.grade).toBeNull()
    expect(activity.weight).toBe(30)
  })

  it('lista todas las actividades creadas', () => {
    const subject = SubjectService.createSubject({ name: 'Materia', professor: 'Prof', credits: 3, userId: 1 })
    ActivityService.createActivity({ subjectId: subject.id, title: 'A1', type: 'tarea', dueDate: '2026-10-01', weight: null })
    ActivityService.createActivity({ subjectId: subject.id, title: 'A2', type: 'tarea', dueDate: '2026-10-02', weight: null })

    expect(ActivityService.getActivities()).toHaveLength(2)
  })

  it('getActivitiesForUser solo trae actividades de materias que el usuario puede ver', () => {
    const anaSubject = SubjectService.createSubject({ name: 'De Ana', professor: 'Prof', credits: 3, userId: 1 })
    const otroSubject = SubjectService.createSubject({ name: 'De Otro', professor: 'Prof', credits: 3, userId: 2 })
    ActivityService.createActivity({ subjectId: anaSubject.id, title: 'Actividad de Ana', type: 'tarea', dueDate: '2026-10-01', weight: null })
    ActivityService.createActivity({ subjectId: otroSubject.id, title: 'Actividad de Otro', type: 'tarea', dueDate: '2026-10-01', weight: null })

    const anaActivities = ActivityService.getActivitiesForUser(1)

    expect(anaActivities).toHaveLength(1)
    expect(anaActivities[0].title).toBe('Actividad de Ana')
  })

  it('getActivitiesBySubject filtra por materia', () => {
    const subjectA = SubjectService.createSubject({ name: 'A', professor: 'Prof', credits: 3, userId: 1 })
    const subjectB = SubjectService.createSubject({ name: 'B', professor: 'Prof', credits: 3, userId: 1 })
    ActivityService.createActivity({ subjectId: subjectA.id, title: 'Solo de A', type: 'tarea', dueDate: '2026-10-01', weight: null })
    ActivityService.createActivity({ subjectId: subjectB.id, title: 'Solo de B', type: 'tarea', dueDate: '2026-10-01', weight: null })

    expect(ActivityService.getActivitiesBySubject(subjectA.id)).toHaveLength(1)
  })

  it('updateActivity actualiza nota y estado, y devuelve null si el id no existe', () => {
    const subject = SubjectService.createSubject({ name: 'Materia', professor: 'Prof', credits: 3, userId: 1 })
    const activity = ActivityService.createActivity({ subjectId: subject.id, title: 'Examen', type: 'examen', dueDate: '2026-10-01', weight: 100 })

    const graded = ActivityService.updateActivity(activity.id, { status: 'completada', grade: 4.5 })
    expect(graded?.grade).toBe(4.5)
    expect(graded?.status).toBe('completada')

    expect(ActivityService.updateActivity(999, { grade: 5 })).toBeNull()
  })

  it('deleteActivity elimina la actividad', () => {
    const subject = SubjectService.createSubject({ name: 'Materia', professor: 'Prof', credits: 3, userId: 1 })
    const activity = ActivityService.createActivity({ subjectId: subject.id, title: 'Borrar', type: 'tarea', dueDate: '2026-10-01', weight: null })

    ActivityService.deleteActivity(activity.id)

    expect(ActivityService.getActivityById(activity.id)).toBeNull()
    expect(ActivityService.getActivities()).toHaveLength(0)
  })
})
