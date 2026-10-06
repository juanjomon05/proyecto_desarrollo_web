// internal imports
import type { ActivityInterface } from '@/interfaces/ActivityInterface'

export const activitySeeder: ActivityInterface[] = [
  { id: 1, subjectId: 1, title: 'Entregable 1 - Arquitectura', type: 'proyecto', dueDate: '2026-09-15', status: 'pendiente', grade: null, weight: 60 },
  { id: 2, subjectId: 1, title: 'Quiz de patrones de diseño', type: 'quiz', dueDate: '2026-09-10', status: 'completada', grade: 4.3, weight: 40 },
  { id: 3, subjectId: 2, title: 'Examen parcial 1', type: 'examen', dueDate: '2026-09-20', status: 'pendiente', grade: null, weight: 100 },
  { id: 4, subjectId: 3, title: 'Tarea de integrales', type: 'tarea', dueDate: '2026-09-08', status: 'completada', grade: 4.6, weight: 100 }
]
