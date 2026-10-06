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
import { DailyLogsService } from './daily-logs.service.js';
import { DailyLog } from './entities/daily-log.entity.js';
import { CreateDailyLogDto } from './dto/create-daily-log.dto.js';
import { UpdateDailyLogDto } from './dto/update-daily-log.dto.js';

@Controller('daily-logs')
export class DailyLogsController {
  constructor(private readonly dailyLogsService: DailyLogsService) {}

  @Get()
  findAll(): Promise<DailyLog[]> {
    return this.dailyLogsService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<DailyLog[]> {
    return this.dailyLogsService.findByUserId(Number(userId));
  }

  @Post()
  create(@Body() createDailyLogDto: CreateDailyLogDto): Promise<DailyLog> {
    return this.dailyLogsService.create(createDailyLogDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDailyLogDto: UpdateDailyLogDto,
  ): Promise<DailyLog | null> {
    return this.dailyLogsService.update(Number(id), updateDailyLogDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.dailyLogsService.delete(Number(id));
  }
}
