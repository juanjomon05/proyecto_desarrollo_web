// external imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// internal imports
import { UsersModule } from './users/users.module.js';
import { SubjectsModule } from './subjects/subjects.module.js';
import { ActivitiesModule } from './activities/activities.module.js';
import { DailyLogsModule } from './daily-logs/daily-logs.module.js';
import { AuthModule } from './auth/auth.module.js';
import { HomeModule } from './home/home.module.js';

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
    AuthModule,
    HomeModule,
  ],
})
export class AppModule {}
