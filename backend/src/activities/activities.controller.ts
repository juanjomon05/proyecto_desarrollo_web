// external imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  findBySubjectId(
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ): Promise<Activity[]> {
    return this.activitiesService.findBySubjectId(subjectId);
  }

  @Get('user/:userId')
  findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Activity[]> {
    return this.activitiesService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Activity | null> {
    return this.activitiesService.findOne(id);
  }

  @Post()
  create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activitiesService.create(createActivityDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity | null> {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.activitiesService.delete(id);
  }
}