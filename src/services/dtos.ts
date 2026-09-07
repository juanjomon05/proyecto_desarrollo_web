// src/services/dtos.ts
// DTOs de entrada para las operaciones de creacion/actualizacion de los services.
// Separan "que necesita la operacion" de "como se guarda el registro" (ver models/types.ts).

import type { ActivityRecord, DailyLogRecord, SubjectData, SubjectRecord } from '@/models/types'

export type CreateSubjectDTO = Pick<SubjectRecord, 'name' | 'professor' | 'credits'> & {
  userId?: string
}

export type UpdateSubjectDTO = Partial<SubjectData>

export type CreateActivityDTO = Pick<ActivityRecord, 'subjectId' | 'title' | 'type' | 'dueDate' | 'weight'>

export type UpdateActivityDTO = Partial<ActivityRecord>

export type CreateDailyLogDTO = Omit<DailyLogRecord, 'id'>

export type UpdateDailyLogDTO = Partial<DailyLogRecord>

export interface RegisterUserDTO {
  name: string
  email: string
  password: string
}
