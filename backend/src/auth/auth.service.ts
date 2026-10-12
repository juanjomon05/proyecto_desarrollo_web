// external imports
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// internal imports
import { verifyPassword } from '../common/password.js';
import { UsersService } from '../users/users.service.js';
import { User } from '../users/entities/user.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { AuthResponse } from './interfaces/auth-response.interface.js';
import { JwtPayload } from './interfaces/jwt-payload.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmailWithPassword(
      loginDto.email,
    );

    if (!user || !(await verifyPassword(loginDto.password, user.password))) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    const { password: _password, ...userWithoutPassword } = user;

    return this.createAuthResponse(userWithoutPassword);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.usersService.findOneByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Ese correo ya está registrado.');
    }

    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
      role: 'student',
    });

    return this.createAuthResponse(user);
  }

  private async createAuthResponse(
    user: Omit<User, 'password'>,
  ): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
