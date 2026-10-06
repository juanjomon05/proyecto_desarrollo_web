// external imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// internal imports
import { DailyLog } from './entities/daily-log.entity.js';
import { DailyLogsController } from './daily-logs.controller.js';
import { DailyLogsService } from './daily-logs.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([DailyLog])],
  controllers: [DailyLogsController],
  providers: [DailyLogsService],
  exports: [DailyLogsService],
})
export class DailyLogsModule {}
