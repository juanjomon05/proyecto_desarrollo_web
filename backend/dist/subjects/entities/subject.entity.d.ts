import { User } from '../../users/entities/user.entity.js';
export declare class Subject {
    id: number;
    name: string;
    professor: string;
    credits: number;
    userId: number | null;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
