// src/services/seedData.ts
// Datos ficticios iniciales, usados solo la primera vez que carga la app.

import type { ActividadData, MateriaData, RegistroDiarioData, UsuarioData } from '@/models/types'

export const seedUsers: UsuarioData[] = [
  { id: 'u1', name: 'Ana Pérez', email: 'ana@studeasy.com', passwordHash: '1234', role: 'student' },
  { id: 'u2', name: 'Admin StudEasy', email: 'admin@studeasy.com', passwordHash: 'admin', role: 'admin' }
]

export const seedSubjects: MateriaData[] = [
  { id: 's1', name: 'Arquitectura de Software', professor: 'Ing. Rodríguez', credits: 4 },
  { id: 's2', name: 'Bases de Datos', professor: 'Ing. Solano', credits: 3 },
  { id: 's3', name: 'Cálculo III', professor: 'Ing. Vargas', credits: 4 }
]

export const seedActivities: ActividadData[] = [
  { id: 'a1', subjectId: 's1', title: 'Entregable 1 - Arquitectura', type: 'proyecto', dueDate: '2026-09-15', status: 'pendiente', grade: null },
  { id: 'a2', subjectId: 's1', title: 'Quiz de patrones de diseño', type: 'quiz', dueDate: '2026-09-10', status: 'completada', grade: 85 },
  { id: 'a3', subjectId: 's2', title: 'Examen parcial 1', type: 'examen', dueDate: '2026-09-20', status: 'pendiente', grade: null },
  { id: 'a4', subjectId: 's3', title: 'Tarea de integrales', type: 'tarea', dueDate: '2026-09-08', status: 'completada', grade: 92 }
]

export const seedDailyLogs: RegistroDiarioData[] = [
  { id: 'd1', userId: 'u1', date: '2026-09-01', studyHours: 3, sleepHours: 7 },
  { id: 'd2', userId: 'u1', date: '2026-09-02', studyHours: 1.5, sleepHours: 5 },
  { id: 'd3', userId: 'u1', date: '2026-09-03', studyHours: 4, sleepHours: 8 }
]
