import { Subject } from '../../subjects/entities/subject.entity.js';
export declare class Activity {
    id: number;
    subjectId: number;
    subject: Subject;
    title: string;
    type: string;
    dueDate: string;
    status: string;
    grade: number | null;
    weight: number | null;
    createdAt: Date;
    updatedAt: Date;
}
