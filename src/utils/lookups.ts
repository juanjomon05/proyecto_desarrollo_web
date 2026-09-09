// src/utils/lookups.ts
// Helpers de busqueda usados por varias vistas para resolver nombres a partir de ids,
// evitando reimplementar el mismo .find() en cada componente.

import type { SubjectInterface } from '@/interfaces/SubjectInterface'

export function getSubjectName(subjects: SubjectInterface[], subjectId: string, fallback = 'Desconocida'): string {
  return subjects.find(subject => subject.id === subjectId)?.name ?? fallback
}
