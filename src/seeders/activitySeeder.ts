import type { ActivityInterface } from '@/interfaces/ActivityInterface'

export const activitySeeder: ActivityInterface[] = [
  { id: 'a1', subjectId: 's1', title: 'Entregable 1 - Arquitectura', type: 'proyecto', dueDate: '2026-09-15', status: 'pendiente', grade: null, weight: 60 },
  { id: 'a2', subjectId: 's1', title: 'Quiz de patrones de diseño', type: 'quiz', dueDate: '2026-09-10', status: 'completada', grade: 4.3, weight: 40 },
  { id: 'a3', subjectId: 's2', title: 'Examen parcial 1', type: 'examen', dueDate: '2026-09-20', status: 'pendiente', grade: null, weight: 100 },
  { id: 'a4', subjectId: 's3', title: 'Tarea de integrales', type: 'tarea', dueDate: '2026-09-08', status: 'completada', grade: 4.6, weight: 100 }
]
