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
  findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<DailyLog[]> {
    return this.dailyLogsService.findByUserId(userId);
  }

  @Post()
  create(@Body() createDailyLogDto: CreateDailyLogDto): Promise<DailyLog> {
    return this.dailyLogsService.create(createDailyLogDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDailyLogDto: UpdateDailyLogDto,
  ): Promise<DailyLog | null> {
    return this.dailyLogsService.update(id, updateDailyLogDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.dailyLogsService.delete(id);
  }
}