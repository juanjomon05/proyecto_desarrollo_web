// internal imports
import { ActivitiesService } from '../activities/activities.service.js';
import { Subject } from '../subjects/entities/subject.entity.js';

export async function seedActivities(
  activitiesService: ActivitiesService,
  [architecture, databases, calculus]: Subject[],
) {
  await activitiesService.create({
    subjectId: architecture.id,
    title: 'Entregable 1 - Arquitectura',
    type: 'proyecto',
    dueDate: '2026-09-15',
    weight: 60,
  });

  const quiz = await activitiesService.create({
    subjectId: architecture.id,
    title: 'Quiz de patrones de diseño',
    type: 'quiz',
    dueDate: '2026-09-10',
    weight: 40,
  });
  await activitiesService.update(quiz.id, { status: 'completada', grade: 4.3 });

  await activitiesService.create({
    subjectId: databases.id,
    title: 'Examen parcial 1',
    type: 'examen',
    dueDate: '2026-09-20',
    weight: 100,
  });

  const homework = await activitiesService.create({
    subjectId: calculus.id,
    title: 'Tarea de integrales',
    type: 'tarea',
    dueDate: '2026-09-08',
    weight: 100,
  });
  await activitiesService.update(homework.id, {
    status: 'completada',
    grade: 4.6,
  });
}
