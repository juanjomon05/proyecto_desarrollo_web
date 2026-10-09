import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module.js';
import { UsersService } from '../users/users.service.js';
import { SubjectsService } from '../subjects/subjects.service.js';
import { ActivitiesService } from '../activities/activities.service.js';
import { DailyLogsService } from '../daily-logs/daily-logs.service.js';
import { seedUsers } from './users.seeder.js';
import { seedSubjects } from './subjects.seeder.js';
import { seedActivities } from './activities.seeder.js';
import { seedDailyLogs } from './daily-logs.seeder.js';
async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);
    const usersService = app.get(UsersService);
    const subjectsService = app.get(SubjectsService);
    const activitiesService = app.get(ActivitiesService);
    const dailyLogsService = app.get(DailyLogsService);
    console.log('Limpiando base de datos...');
    await dataSource.query('DELETE FROM activities');
    await dataSource.query('DELETE FROM daily_logs');
    await dataSource.query('DELETE FROM subjects');
    await dataSource.query('DELETE FROM users');
    await dataSource.query(`
    DELETE FROM sqlite_sequence
    WHERE name IN (
      'activities',
      'daily_logs',
      'subjects',
      'users'
    )
  `);
    console.log('Creando usuarios...');
    const student = await seedUsers(usersService);
    console.log('Creando materias...');
    const subjects = await seedSubjects(subjectsService, student.id);
    console.log('Creando actividades...');
    await seedActivities(activitiesService, subjects);
    console.log('Creando registros diarios...');
    await seedDailyLogs(dailyLogsService, student.id);
    console.log('Seed completado correctamente.');
    await app.close();
}
seed().catch((error) => {
    console.error('Error ejecutando seed:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map