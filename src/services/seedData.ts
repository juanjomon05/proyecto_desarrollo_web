// src/services/seedData.ts
// Datos ficticios iniciales, usados solo la primera vez que carga la app.

import type { ActivityRecord, DailyLogRecord, SubjectRecord, UserData } from '@/models/types'

export const seedUsers: UserData[] = [
  { id: 'u1', name: 'Ana Pérez', email: 'ana@studeasy.com', passwordHash: '1234', role: 'student' },
  { id: 'u2', name: 'Admin StudEasy', email: 'admin@studeasy.com', passwordHash: 'admin', role: 'admin' }
]

export const seedSubjects: SubjectRecord[] = [
  { id: 's1', userId: 'u1', name: 'Arquitectura de Software', professor: 'Ing. Rodríguez', credits: 4 },
  { id: 's2', userId: 'u1', name: 'Bases de Datos', professor: 'Ing. Solano', credits: 3 },
  { id: 's3', userId: 'u1', name: 'Cálculo III', professor: 'Ing. Vargas', credits: 4 }
]

// Nota sobre 5.0 (minimo para ganar la materia: 3.0). weight = % que vale la
// actividad dentro de la nota final de su materia.
export const seedActivities: ActivityRecord[] = [
  { id: 'a1', subjectId: 's1', title: 'Entregable 1 - Arquitectura', type: 'proyecto', dueDate: '2026-09-15', status: 'pendiente', grade: null, weight: 60 },
  { id: 'a2', subjectId: 's1', title: 'Quiz de patrones de diseño', type: 'quiz', dueDate: '2026-09-10', status: 'completada', grade: 4.3, weight: 40 },
  { id: 'a3', subjectId: 's2', title: 'Examen parcial 1', type: 'examen', dueDate: '2026-09-20', status: 'pendiente', grade: null, weight: 100 },
  { id: 'a4', subjectId: 's3', title: 'Tarea de integrales', type: 'tarea', dueDate: '2026-09-08', status: 'completada', grade: 4.6, weight: 100 }
]

export const seedDailyLogs: DailyLogRecord[] = [
  { id: 'd1', userId: 'u1', date: '2026-09-01', studyHours: 3, sleepHours: 7 },
  { id: 'd2', userId: 'u1', date: '2026-09-02', studyHours: 1.5, sleepHours: 5 },
  { id: 'd3', userId: 'u1', date: '2026-09-03', studyHours: 4, sleepHours: 8 }
]
