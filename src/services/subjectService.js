// src/services/subjectService.js
// CRUD de Materia. Ninguna view debe llamar a storage.js directamente,
// siempre pasa por aqui.

import { Materia } from '@/models/Materia'

export function getAllSubjects() {
  return Materia.obtenerTodas()
}

export function getSubjectById(id) {
  return Materia.obtenerPorId(id)
}

export function createSubject({ name, professor, credits }) {
  return Materia.crear({ name, professor, credits })
}

export function updateSubject(id, changes) {
  return Materia.actualizar(id, changes)
}

export function deleteSubject(id) {
  Materia.eliminar(id)
}
