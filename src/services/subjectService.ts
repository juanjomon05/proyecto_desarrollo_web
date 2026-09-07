// src/services/subjectService.ts
// CRUD de Subject. Ninguna view debe llamar a storage.ts directamente,
// siempre pasa por aqui.

import { Subject } from '@/models/Subject'
import type { CreateSubjectDTO, UpdateSubjectDTO } from './dtos'

export function getAllSubjects(): Subject[] {
  return Subject.getAll()
}

export function getSubjectsByUser(userId: string): Subject[] {
  return Subject.getByUser(userId)
}

export function getSubjectById(id: string): Subject | null {
  return Subject.getById(id)
}

export function createSubject({ name, professor, credits, userId }: CreateSubjectDTO): Subject {
  return Subject.create({ name, professor, credits, userId })
}

export function updateSubject(id: string, changes: UpdateSubjectDTO): Subject | null {
  return Subject.update(id, changes)
}

export function deleteSubject(id: string): void {
  Subject.delete(id)
}
