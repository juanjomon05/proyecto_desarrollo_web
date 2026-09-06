// src/models/types.ts
// Interfaces de dominio compartidas por modelos, servicios y vistas.

export type ActivityType = 'tarea' | 'quiz' | 'examen' | 'proyecto'
export type ActivityStatus = 'pendiente' | 'en progreso' | 'completada'
export type UserRole = 'student' | 'admin'

export interface UserData {
  id: string
  name: string
  email: string
  passwordHash: string
  role: UserRole
}

export interface SubjectData {
  id?: string
  name: string
  professor: string
  credits: number | string
}

export interface ActivityData {
  id?: string
  title: string
  type: ActivityType
  dueDate: string
  status?: ActivityStatus
  grade?: number | string | null
}

export interface DailyLogData {
  id?: string
  date: string
  studyHours: number | string
  sleepHours: number | string
}

export interface SubjectRecord extends SubjectData {
  userId?: string
}

export interface ActivityRecord extends ActivityData {
  subjectId: string
}

export interface DailyLogRecord extends DailyLogData {
  userId: string
}

export interface PerformanceData {
  activityId: string
  activityTitle: string
  dueDate: string
  grade: number | null
  avgStudyHours: number | null
  avgSleepHours: number | null
}
