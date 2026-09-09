export type ActivityType = 'tarea' | 'quiz' | 'examen' | 'proyecto'
export type ActivityStatus = 'pendiente' | 'en progreso' | 'completada'

export interface ActivityInterface {
  id: string
  subjectId: string
  title: string
  type: ActivityType
  dueDate: string
  status: ActivityStatus
  grade: number | null
  weight: number | null
}
