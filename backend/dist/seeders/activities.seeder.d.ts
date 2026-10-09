import { ActivitiesService } from '../activities/activities.service.js';
import { Subject } from '../subjects/entities/subject.entity.js';
export declare function seedActivities(activitiesService: ActivitiesService, [architecture, databases, calculus]: Subject[]): Promise<void>;
