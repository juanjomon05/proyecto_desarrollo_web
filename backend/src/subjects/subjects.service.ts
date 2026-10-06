// external imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// internal imports
import { Subject } from './entities/subject.entity.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import { UpdateSubjectDto } from './dto/update-subject.dto.js';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  findAll(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  findByUserId(userId: number): Promise<Subject[]> {
    return this.subjectsRepository.findBy({ userId });
  }

  findOne(id: number): Promise<Subject | null> {
    return this.subjectsRepository.findOneBy({ id });
  }

  create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subject = this.subjectsRepository.create(createSubjectDto);

    return this.subjectsRepository.save(subject);
  }

  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject | null> {
    const subject = await this.subjectsRepository.findOneBy({ id });

    if (!subject) {
      return null;
    }

    this.subjectsRepository.merge(subject, updateSubjectDto);

    return this.subjectsRepository.save(subject);
  }

  async delete(id: number): Promise<void> {
    await this.subjectsRepository.delete(id);
  }
}
