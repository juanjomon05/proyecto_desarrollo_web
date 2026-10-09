import { SubjectsService } from '../subjects/subjects.service.js';
import { Subject } from '../subjects/entities/subject.entity.js';
export declare function seedSubjects(subjectsService: SubjectsService, userId: number): Promise<Subject[]>;
