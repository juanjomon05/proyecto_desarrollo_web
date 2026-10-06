// external imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// internal imports
import { DailyLog } from './entities/daily-log.entity.js';
import { CreateDailyLogDto } from './dto/create-daily-log.dto.js';
import { UpdateDailyLogDto } from './dto/update-daily-log.dto.js';

@Injectable()
export class DailyLogsService {
  constructor(
    @InjectRepository(DailyLog)
    private dailyLogsRepository: Repository<DailyLog>,
  ) {}

  findAll(): Promise<DailyLog[]> {
    return this.dailyLogsRepository.find();
  }

  findByUserId(userId: number): Promise<DailyLog[]> {
    return this.dailyLogsRepository.find({
      where: { userId },
      order: { date: 'ASC' },
    });
  }

  create(createDailyLogDto: CreateDailyLogDto): Promise<DailyLog> {
    const dailyLog = this.dailyLogsRepository.create(createDailyLogDto);

    return this.dailyLogsRepository.save(dailyLog);
  }

  async update(
    id: number,
    updateDailyLogDto: UpdateDailyLogDto,
  ): Promise<DailyLog | null> {
    const dailyLog = await this.dailyLogsRepository.findOneBy({ id });

    if (!dailyLog) {
      return null;
    }

    this.dailyLogsRepository.merge(dailyLog, updateDailyLogDto);

    return this.dailyLogsRepository.save(dailyLog);
  }

  async delete(id: number): Promise<void> {
    await this.dailyLogsRepository.delete(id);
  }
}
