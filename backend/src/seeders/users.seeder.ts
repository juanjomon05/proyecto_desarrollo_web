// internal imports
import { UsersService } from '../users/users.service.js';
import { User } from '../users/entities/user.entity.js';

export async function seedUsers(usersService: UsersService): Promise<User> {
  const student = await usersService.create({
    name: 'Ana Pérez',
    email: 'ana@studeasy.com',
    password: '1234',
    role: 'student',
  });

  await usersService.create({
    name: 'Admin StudEasy',
    email: 'admin@studeasy.com',
    password: 'admin',
    role: 'admin',
  });

  return student;
}
