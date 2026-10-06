// external imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// internal imports
import { UsersModule } from './users/users.module.js';
import { SubjectsModule } from './subjects/subjects.module.js';
import { ActivitiesModule } from './activities/activities.module.js';
import { DailyLogsModule } from './daily-logs/daily-logs.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.SQLITE_PATH ?? 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    SubjectsModule,
    ActivitiesModule,
    DailyLogsModule,
  ],
})
export class AppModule {}
