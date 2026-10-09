import { UsersService } from '../users/users.service.js';
import { User } from '../users/entities/user.entity.js';
export declare function seedUsers(usersService: UsersService): Promise<User>;
