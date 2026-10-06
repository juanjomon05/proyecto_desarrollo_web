// internal imports
import { SubjectsService } from '../subjects/subjects.service.js';
import { Subject } from '../subjects/entities/subject.entity.js';

export async function seedSubjects(
  subjectsService: SubjectsService,
  userId: number,
): Promise<Subject[]> {
  const architecture = await subjectsService.create({
    name: 'Arquitectura de Software',
    professor: 'Ing. Rodríguez',
    credits: 4,
    userId,
  });

  const databases = await subjectsService.create({
    name: 'Bases de Datos',
    professor: 'Ing. Solano',
    credits: 3,
    userId,
  });

  const calculus = await subjectsService.create({
    name: 'Cálculo III',
    professor: 'Ing. Vargas',
    credits: 4,
    userId,
  });

  return [architecture, databases, calculus];
}
