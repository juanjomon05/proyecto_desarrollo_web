import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity.js';
import { CreateActivityDto } from './dto/create-activity.dto.js';
import { UpdateActivityDto } from './dto/update-activity.dto.js';
export declare class ActivitiesService {
    private activitiesRepository;
    constructor(activitiesRepository: Repository<Activity>);
    findAll(): Promise<Activity[]>;
    findBySubjectId(subjectId: number): Promise<Activity[]>;
    findByUserId(userId: number): Promise<Activity[]>;
    findOne(id: number): Promise<Activity | null>;
    create(createActivityDto: CreateActivityDto): Promise<Activity>;
    update(id: number, updateActivityDto: UpdateActivityDto): Promise<Activity | null>;
    delete(id: number): Promise<void>;
}
