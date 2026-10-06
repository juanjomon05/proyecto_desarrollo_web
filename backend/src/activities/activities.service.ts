// external imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// internal imports
import { Activity } from './entities/activity.entity.js';
import { CreateActivityDto } from './dto/create-activity.dto.js';
import { UpdateActivityDto } from './dto/update-activity.dto.js';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  findAll(): Promise<Activity[]> {
    return this.activitiesRepository.find();
  }

  findBySubjectId(subjectId: number): Promise<Activity[]> {
    return this.activitiesRepository.findBy({ subjectId });
  }

  findByUserId(userId: number): Promise<Activity[]> {
    return this.activitiesRepository.findBy({ subject: { userId } });
  }

  findOne(id: number): Promise<Activity | null> {
    return this.activitiesRepository.findOneBy({ id });
  }

  create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = this.activitiesRepository.create(createActivityDto);

    return this.activitiesRepository.save(activity);
  }

  async update(
    id: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity | null> {
    const activity = await this.activitiesRepository.findOneBy({ id });

    if (!activity) {
      return null;
    }

    this.activitiesRepository.merge(activity, updateActivityDto);

    return this.activitiesRepository.save(activity);
  }

  async delete(id: number): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}
