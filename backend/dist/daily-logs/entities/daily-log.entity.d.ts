import { User } from '../../users/entities/user.entity.js';
export declare class DailyLog {
    id: number;
    userId: number;
    user: User;
    date: string;
    studyHours: number;
    sleepHours: number;
    createdAt: Date;
    updatedAt: Date;
}
