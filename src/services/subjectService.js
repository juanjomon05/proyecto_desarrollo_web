// src/services/subjectService.js
// CRUD de Subject (Materia). Ninguna view debe llamar a storage.js directamente,
// siempre pasa por aqui.

import { getItem, setItem } from './storage'
import { KEYS } from './init'

export function getAllSubjects() {
  return getItem(KEYS.subjects) || []
}

export function getSubjectById(id) {
  return getAllSubjects().find(subject => subject.id === id) || null
}

export function createSubject({ name, professor, credits }) {
  const subjects = getAllSubjects()
  const newSubject = {
    id: crypto.randomUUID(),
    name,
    professor,
    credits
  }
  subjects.push(newSubject)
  setItem(KEYS.subjects, subjects)
  return newSubject
}

export function updateSubject(id, changes) {
  const subjects = getAllSubjects()
  const index = subjects.findIndex(subject => subject.id === id)
  if (index === -1) return null

  subjects[index] = { ...subjects[index], ...changes }
  setItem(KEYS.subjects, subjects)
  return subjects[index]
}

export function deleteSubject(id) {
  const subjects = getAllSubjects().filter(subject => subject.id !== id)
  setItem(KEYS.subjects, subjects)
}