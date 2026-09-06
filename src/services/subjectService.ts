// src/services/subjectService.ts
// CRUD de Materia. Ninguna view debe llamar a storage.ts directamente,
// siempre pasa por aqui.

import { Materia } from '@/models/Materia'
import type { MateriaData } from '@/models/types'

export function getAllSubjects(): Materia[] {
  return Materia.obtenerTodas()
}

export function getSubjectById(id: string): Materia | null {
  return Materia.obtenerPorId(id)
}

export function createSubject({ name, professor, credits }: Pick<MateriaData, 'name' | 'professor' | 'credits'>): Materia {
  return Materia.crear({ name, professor, credits })
}

export function updateSubject(id: string, changes: Partial<MateriaData>): Materia | null {
  return Materia.actualizar(id, changes)
}

export function deleteSubject(id: string): void {
  Materia.eliminar(id)
}
