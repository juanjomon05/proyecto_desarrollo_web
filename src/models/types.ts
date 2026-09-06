// src/models/types.ts
// Interfaces de dominio compartidas por modelos, servicios y vistas.

export type ActivityType = 'tarea' | 'quiz' | 'examen' | 'proyecto'
export type ActivityStatus = 'pendiente' | 'en progreso' | 'completada'
export type UserRole = 'student' | 'admin'

export interface MateriaData {
  id?: string
  name: string
  professor: string
  credits: number
}

export interface ActividadData {
  id?: string
  subjectId: string
  title: string
  type: ActivityType
  dueDate: string
  status?: ActivityStatus
  grade?: number | string | null
}

export interface UsuarioData {
  id: string
  name: string
  email: string
  passwordHash: string
  role: UserRole
}

export interface RegistroDiarioData {
  id?: string
  userId: string
  date: string
  studyHours: number | string
  sleepHours: number | string
}

export interface ReporteRendimientoData {
  activityId: string
  activityTitle: string
  dueDate: string
  grade: number | null
  avgStudyHours: number | null
  avgSleepHours: number | null
}
