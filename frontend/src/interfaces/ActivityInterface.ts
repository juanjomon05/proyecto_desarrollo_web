// types
export type ActivityType = 'tarea' | 'quiz' | 'examen' | 'proyecto'
export type ActivityStatus = 'pendiente' | 'en progreso' | 'completada'

// main interface
export interface ActivityInterface {
  id: number
  subjectId: number
  title: string
  type: ActivityType
  dueDate: string
  status: ActivityStatus
  grade: number | null
  weight: number | null
}
