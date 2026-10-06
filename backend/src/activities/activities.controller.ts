// external imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// internal imports
import { ActivitiesService } from './activities.service.js';
import { Activity } from './entities/activity.entity.js';
import { CreateActivityDto } from './dto/create-activity.dto.js';
import { UpdateActivityDto } from './dto/update-activity.dto.js';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  findAll(): Promise<Activity[]> {
    return this.activitiesService.findAll();
  }

  @Get('subject/:subjectId')
  findBySubjectId(@Param('subjectId') subjectId: string): Promise<Activity[]> {
    return this.activitiesService.findBySubjectId(Number(subjectId));
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<Activity[]> {
    return this.activitiesService.findByUserId(Number(userId));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Activity | null> {
    return this.activitiesService.findOne(Number(id));
  }

  @Post()
  create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activitiesService.create(createActivityDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity | null> {
    return this.activitiesService.update(Number(id), updateActivityDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.activitiesService.delete(Number(id));
  }
}
