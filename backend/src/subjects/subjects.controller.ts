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
import { SubjectsService } from './subjects.service.js';
import { Subject } from './entities/subject.entity.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import { UpdateSubjectDto } from './dto/update-subject.dto.js';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<Subject[]> {
    return this.subjectsService.findByUserId(Number(userId));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Subject | null> {
    return this.subjectsService.findOne(Number(id));
  }

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectsService.create(createSubjectDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject | null> {
    return this.subjectsService.update(Number(id), updateSubjectDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.subjectsService.delete(Number(id));
  }
}
