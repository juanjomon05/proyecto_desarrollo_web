// external imports
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

// internal imports
import { verifyPassword } from '../common/password.js';
import { UsersService } from '../users/users.service.js';
import { User } from '../users/entities/user.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user || !(await verifyPassword(loginDto.password, user.password))) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    return user;
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.usersService.findOneByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Ese correo ya está registrado.');
    }

    return this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
      role: 'student',
    });
  }
}