// external imports
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// internal imports
import { ActivityService } from '@/services/activityService'
import { SubjectService } from '@/services/subjectService'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('ActivityService', () => {
  it('crea una actividad pendiente y sin nota por defecto', () => {
    const subject = SubjectService.createSubject({ name: 'Materia', professor: 'Prof', credits: 3, userId: 'u1' })

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
    const subject = SubjectService.createSubject({ name: 'Materia', professor: 'Prof', credits: 3, userId: 'u1' })
    ActivityService.createActivity({ subjectId: subject.id, title: 'A1', type: 'tarea', dueDate: '2026-10-01', weight: null })
    ActivityService.createActivity({ subjectId: subject.id, title: 'A2', type: 'tarea', dueDate: '2026-10-02', weight: null })

    expect(ActivityService.getActivities()).toHaveLength(2)
  })

  it('getActivitiesForUser solo trae actividades de materias que el usuario puede ver', () => {
    const anaSubject = SubjectService.createSubject({ name: 'De Ana', professor: 'Prof', credits: 3, userId: 'u1' })
    const otroSubject = SubjectService.createSubject({ name: 'De Otro', professor: 'Prof', credits: 3, userId: 'u2' })
    ActivityService.createActivity({ subjectId: anaSubject.id, title: 'Actividad de Ana', type: 'tarea', dueDate: '2026-10-01', weight: null })
    ActivityService.createActivity({ subjectId: otroSubject.id, title: 'Actividad de Otro', type: 'tarea', dueDate: '2026-10-01', weight: null })

    const anaActivities = ActivityService.getActivitiesForUser('u1')

    expect(anaActivities).toHaveLength(1)
    expect(anaActivities[0].title).toBe('Actividad de Ana')
  })

  it('getActivitiesBySubject y getActivitySubjectId filtran correctamente', () => {
    const subjectA = SubjectService.createSubject({ name: 'A', professor: 'Prof', credits: 3, userId: 'u1' })
    const subjectB = SubjectService.createSubject({ name: 'B', professor: 'Prof', credits: 3, userId: 'u1' })
    const activity = ActivityService.createActivity({ subjectId: subjectA.id, title: 'Solo de A', type: 'tarea', dueDate: '2026-10-01', weight: null })
    ActivityService.createActivity({ subjectId: subjectB.id, title: 'Solo de B', type: 'tarea', dueDate: '2026-10-01', weight: null })

    expect(ActivityService.getActivitiesBySubject(subjectA.id)).toHaveLength(1)
    expect(ActivityService.getActivitySubjectId(activity.id)).toBe(subjectA.id)
  })

  it('updateActivity actualiza nota y peso, y normaliza valores vacíos a null', () => {
    const subject = SubjectService.createSubject({ name: 'Materia', professor: 'Prof', credits: 3, userId: 'u1' })
    const activity = ActivityService.createActivity({ subjectId: subject.id, title: 'Examen', type: 'examen', dueDate: '2026-10-01', weight: 100 })

    const graded = ActivityService.updateActivity(activity.id, { status: 'completada', grade: 4.5 })
    expect(graded?.grade).toBe(4.5)
    expect(graded?.status).toBe('completada')

    const cleared = ActivityService.updateActivity(activity.id, { grade: '' as unknown as number })
    expect(cleared?.grade).toBeNull()

    expect(ActivityService.updateActivity('no-existe', { grade: 5 })).toBeNull()
  })

  it('deleteActivity elimina la actividad', () => {
    const subject = SubjectService.createSubject({ name: 'Materia', professor: 'Prof', credits: 3, userId: 'u1' })
    const activity = ActivityService.createActivity({ subjectId: subject.id, title: 'Borrar', type: 'tarea', dueDate: '2026-10-01', weight: null })

    ActivityService.deleteActivity(activity.id)

    expect(ActivityService.getActivityById(activity.id)).toBeNull()
    expect(ActivityService.getActivities()).toHaveLength(0)
  })
})
