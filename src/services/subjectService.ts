// src/services/subjectService.ts
// CRUD de Subject. Ninguna view debe llamar a storage.ts directamente,
// siempre pasa por aqui.

import { Subject } from '@/models/Subject'
import type { SubjectData, SubjectRecord } from '@/models/types'

export function getAllSubjects(): Subject[] {
  return Subject.getAll()
}

export function getSubjectsByUser(userId: string): Subject[] {
  return Subject.getByUser(userId)
}

export function getSubjectById(id: string): Subject | null {
  return Subject.getById(id)
}

export function createSubject({ name, professor, credits, userId }: Pick<SubjectRecord, 'name' | 'professor' | 'credits'> & { userId?: string }): Subject {
  return Subject.create({ name, professor, credits, userId })
}

export function updateSubject(id: string, changes: Partial<SubjectData>): Subject | null {
  return Subject.update(id, changes)
}

export function deleteSubject(id: string): void {
  Subject.delete(id)
}
